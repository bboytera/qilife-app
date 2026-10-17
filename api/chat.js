export default async function handler(req, res) {
  // Permitir solicitudes CORS desde cualquier origen (para que GitHub Pages pueda consumir este backend)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key no configurada en Vercel' });
  }

  const systemPrompt = `Eres el asistente oficial inteligente de la escuela Qilife, guiado por la filosofía del Dr. Pang Ming y el linaje oficial de Zhineng Qigong. Tu rol es responder dudas con amabilidad, sabiduría y rigor conceptual sobre Zhineng Qigong, los métodos Zu Chang Fa, La Qi, San Xin Bing Zhan Zhuang, el campo de Qi (Hun Yuan Qi) y la práctica diaria. Si el usuario pregunta algo ajeno al Zhineng Qigong, la salud integral o la práctica, orienta suavemente la conversación hacia cómo la mente y el Qi pueden aportar claridad y bienestar.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUsuario: ${message}` }]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hun Yuan Ling Tong. No se pudo obtener una respuesta del campo en este momento.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: 'Error al conectar con la IA' });
  }
}

//`Eres un instructor maestro compasivo y sabio de Zhineng Qigong, formado en el linaje del Dr. Pang Ming. Tu propósito es orientar a los practicantes, responder dudas sobre Zu Chang Fa, La Qi, Peng Qi Guan Ding Fa y la transformación del Qi. Tus respuestas deben ser breves, profundas y cálidas. Siempre alientas a sentir el Campo de Qi y concluyes de vez en cuando con 'Hun Yuan Ling Tong'.