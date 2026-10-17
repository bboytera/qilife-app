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
      return res.status(200).json({ reply: "Hun Yuan Ling Tong. Falta configurar la API Key en Vercel." });
    }

    const systemPrompt = "Eres un instructor maestro compasivo y sabio de Zhineng Qigong, formado en el linaje del Dr. Pang Ming. Tu propósito es orientar a los practicantes, responder dudas sobre Zu Chang Fa, La Qi, Peng Qi Guan Ding Fa y la transformación del Qi. Tus respuestas deben ser breves, profundas y cálidas. Siempre alientas a sentir el Campo de Qi y concluyes de vez en cuando con 'Hun Yuan Ling Tong'.";

    // Intentamos primero con gemini-3.8-flash y si está saturado cambiamos a gemini-2.5-flash
    const modelsToTry = ["gemini-3.8-flash", "gemini-2.5-flash"];
    let lastError = null;

    for (const modelName of modelsToTry) {
      const googleRes = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
          "Api-Revision": "2026-05-20"
        },
        body: JSON.stringify({
          model: modelName,
          input: `${systemPrompt}\n\nConsulta del alumno: ${userText}`
        })
      });

      const data = await googleRes.json();

      if (googleRes.ok) {
        const reply = data.output_text || data.steps?.[0]?.content?.[0]?.text || "Hun Yuan Ling Tong. Siente la información del campo.";
        return res.status(200).json({ reply });
      }

      lastError = data.error?.message || `Error ${googleRes.status}`;
    }

    return res.status(200).json({ 
      reply: `Hun Yuan Ling Tong. El campo de energía se encuentra reestructurándose (${lastError}). Por favor intenta en un momento.` 
    });

  } catch (error) {
    return res.status(200).json({ reply: "Hun Yuan Ling Tong. Error de conexión con el servidor." });
  }
}