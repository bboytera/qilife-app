export default async function handler(req, res) {
  // Manejo de CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { messages = [], userText = '' } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Falta GEMINI_API_KEY en variables de entorno");
      return res.status(200).json({ reply: "Hun Yuan Ling Tong. Configuración en revisión por el instructor." });
    }

    const systemPrompt = "Eres un instructor maestro compasivo y sabio de Zhineng Qigong, formado en el linaje del Dr. Pang Ming. Tu propósito es orientar a los practicantes, responder dudas sobre Zu Chang Fa, La Qi, Peng Qi Guan Ding Fa y la transformación del Qi. Tus respuestas deben ser breves, profundas y cálidas. Siempre alientas a sentir el Campo de Qi y concluyes de vez en cuando con 'Hun Yuan Ling Tong'.";

    // Construcción limpia del historial
    const contents = [
      {
        role: 'user',
        parts: [{ text: `Instrucción de rol: ${systemPrompt}` }]
      },
      {
        role: 'model',
        parts: [{ text: 'Entendido. Asumo la presencia y sabiduría de instructor de Zhineng Qigong. Hun Yuan Ling Tong.' }]
      }
    ];

    if (Array.isArray(messages)) {
      messages.forEach(msg => {
        if (msg && msg.text) {
          contents.push({
            role: msg.role === 'ai' ? 'model' : 'user',
            parts: [{ text: String(msg.text) }]
          });
        }
      });
    }

    if (userText) {
      contents.push({
        role: 'user',
        parts: [{ text: String(userText) }]
      });
    }

    // Endpoint REST estándar y estable para v1beta
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const googleRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    const data = await googleRes.json();

    if (!googleRes.ok) {
      console.error("Google API Error:", JSON.stringify(data));
      return res.status(200).json({ 
        reply: "Hun Yuan Ling Tong. El campo se está reorganizando, realiza nuevamente tu consulta." 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hun Yuan Ling Tong. Conectando con la información del campo...";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Vercel Serverless Error:", error);
    return res.status(200).json({ 
      reply: "Hun Yuan Ling Tong. El campo de Qi está en reposo. Intenta de nuevo en un momento." 
    });
  }
}