export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  try {
    const { userText = '' } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ reply: "Falta configurar GEMINI_API_KEY en Vercel." });
    }

    const systemPrompt = "Eres un instructor maestro compasivo y sabio de Zhineng Qigong, formado en el linaje del Dr. Pang Ming. Tu propósito es orientar a los practicantes, responder dudas sobre Zu Chang Fa, La Qi, Peng Qi Guan Ding Fa y la transformación del Qi. Tus respuestas deben ser breves, profundas y cálidas. Siempre alientas a sentir el Campo de Qi y concluyes de vez en cuando con 'Hun Yuan Ling Tong'.";

    // Usamos la API REST clásica pero con el modelo actual: gemini-3.8-flash
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const googleRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nPregunta del alumno: ${userText}` }]
          }
        ]
      })
    });

    const data = await googleRes.json();

    if (!googleRes.ok) {
      return res.status(200).json({ 
        reply: `Error de Google (${googleRes.status}): ${data.error?.message || 'Verifica la API Key'}` 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hun Yuan Ling Tong. No se obtuvo respuesta del campo.";
    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(200).json({ reply: "Error de conexión con el servidor." });
  }
}