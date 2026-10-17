export default async function handler(req, res) {
  // Configuración de cabeceras CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
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

  const { messages = [], userText = '' } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key no configurada en Vercel' });
  }

  const systemPrompt = `Eres un instructor maestro compasivo y sabio de Zhineng Qigong, formado en el linaje del Dr. Pang Ming. Tu propósito es orientar a los practicantes, responder dudas sobre Zu Chang Fa, La Qi, Peng Qi Guan Ding Fa y la transformación del Qi. Tus respuestas deben ser breves, profundas y cálidas. Siempre alientas a sentir el Campo de Qi y concluyes de vez en cuando con 'Hun Yuan Ling Tong'.`;

  // Construcción del historial combinando el Prompt del Sistema
  const contents = [
    {
      role: 'user',
      parts: [{ text: `[INSTRUCCIÓN DE SISTEMA: ${systemPrompt}]` }]
    },
    {
      role: 'model',
      parts: [{ text: 'Entendido. Asumo el rol de instructor maestro compasivo de Zhineng Qigong. Hun Yuan Ling Tong.' }]
    }
  ];

  // Mapeo de mensajes previos
  messages.forEach(msg => {
    contents.push({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    });
  });

  // Mensaje actual del usuario
  if (userText) {
    contents.push({
      role: 'user',
      parts: [{ text: userText }]
    });
  }

  try {
    // Usamos el endpoint actualizado y compatible de Gemini 2.5
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error devuelto por la API de Google:", data);
      return res.status(200).json({ 
        reply: "Hun Yuan Ling Tong. El campo está ajustando su energía, por favor realiza una consulta sobre Zu Chang Fa o la práctica." 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hun Yuan Ling Tong. Siente la información del campo y vuelve a preguntar.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error en el servidor Vercel:", error);
    return res.status(500).json({ error: 'Error interno de conexión' });
  }
}