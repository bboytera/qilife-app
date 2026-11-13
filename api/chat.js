import process from 'node:process';
import { setTimeout as wait } from 'node:timers/promises';

const MAX_MESSAGE_LENGTH = 2000;
const HISTORY_LIMIT = 8;
const ATTEMPT_TIMEOUT_MS = 8000;
const DEFAULT_MODEL = 'gemini-3.8-flash';
const DEFAULT_FALLBACK_MODEL = 'gemini-3.5-flash-lite';

const SYSTEM_INSTRUCTION = "Eres un asistente de Zhineng Qigong inspirado en las enseñanzas del Dr. Pang Ming. Orienta a los practicantes sobre Zu Chang Fa, La Qi, Peng Qi Guan Ding Fa y la transformación del Qi según la teoría del Hun Yuan (masa, energía e información). Responde en español con calidez y brevedad. Cuando sea pertinente, invita a sentir el Campo de Qi y puedes concluir con 'Hun Yuan Ling Tong'.";

function buildContents(messages, userText) {
  const contents = [];
  for (const message of Array.isArray(messages) ? messages.slice(-HISTORY_LIMIT) : []) {
    if (!['user', 'ai'].includes(message?.role) || typeof message.text !== 'string') continue;
    const text = message.text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!text) continue;

    const role = message.role === 'user' ? 'user' : 'model';
    const previous = contents.at(-1);
    if (!previous && role === 'model') continue;
    if (previous?.role === role) {
      previous.parts.push({ text });
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }
  if (contents.at(-1)?.role === 'user') {
    contents.at(-1).parts.push({ text: userText });
  } else {
    contents.push({ role: 'user', parts: [{ text: userText }] });
  }
  return contents;
}

async function generateReply(model, apiKey, body) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body,
      signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
    });
    if (!response.ok) {
      await response.body?.cancel().catch(() => {});
      console.warn('Gemini devolvió un error', { model, status: response.status });
      return { status: response.status };
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const reply = candidate?.content?.parts
      ?.filter(part => !part.thought && typeof part.text === 'string')
      .map(part => part.text).join('').trim();
    if (reply) return { status: 200, reply };

    const blocked = data.promptFeedback?.blockReason || ['SAFETY', 'PROHIBITED_CONTENT'].includes(candidate?.finishReason);
    console.warn('Gemini devolvió una respuesta sin texto', { model, finishReason: candidate?.finishReason });
    return { status: blocked ? 422 : 502 };
  } catch (error) {
    const status = error.name === 'TimeoutError' ? 504 : 502;
    console.warn('Falló la solicitud a Gemini', { model, status });
    return { status };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { userText, messages } = req.body || {};
  const question = typeof userText === 'string' ? userText.trim() : '';
  if (!question || question.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Escribe una pregunta de entre 1 y 2000 caracteres.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Falta configurar GEMINI_API_KEY');
    return res.status(500).json({ error: 'El asistente no está disponible en este momento.', retryable: false });
  }

  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const fallbackModel = process.env.GEMINI_FALLBACK_MODEL?.trim() || DEFAULT_FALLBACK_MODEL;
  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    contents: buildContents(messages, question),
  });

  let result = await generateReply(model, apiKey, body);
  if (result.status === 503) {
    await wait(500 + Math.floor(Math.random() * 300));
    result = await generateReply(model, apiKey, body);
  }
  if ([502, 503, 504].includes(result.status) && fallbackModel !== model) {
    const fallback = await generateReply(fallbackModel, apiKey, body);
    if (fallback.reply || fallback.status === 422) result = fallback;
  }

  if (result.reply) return res.status(200).json({ reply: result.reply });
  if (result.status === 429) {
    return res.status(429).json({ error: 'El asistente alcanzó su límite de uso. Intenta más tarde.', retryable: false });
  }
  if (result.status === 503) {
    return res.status(503).json({ error: 'El asistente está saturado en este momento. Intenta en unos segundos.', retryable: true });
  }
  if (result.status === 422) {
    return res.status(422).json({ error: 'El asistente no pudo responder esta consulta. Prueba reformularla.', retryable: false });
  }

  const retryable = result.status >= 500;
  return res.status(result.status === 504 ? 504 : 502).json({
    error: retryable ? 'El asistente no pudo responder. Intenta de nuevo.' : 'El asistente no está disponible en este momento.',
    retryable,
  });
}
