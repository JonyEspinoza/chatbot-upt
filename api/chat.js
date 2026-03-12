// api/chat.js — Serverless Function (Vercel)
// La API key NUNCA se expone al frontend. Solo existe en el servidor.

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Validar que existe la API key en las variables de entorno del servidor
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY no configurada en las variables de entorno');
    return res.status(500).json({ error: 'Configuración del servidor incompleta' });
  }

  // Validar el body de la solicitud
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'El campo "messages" es requerido y debe ser un array' });
  }

  // Validar estructura básica de mensajes (seguridad)
  const validRoles = ['user', 'assistant'];
  const isValid = messages.every(
    m => validRoles.includes(m.role) && typeof m.content === 'string' && m.content.trim().length > 0
  );
  if (!isValid) {
    return res.status(400).json({ error: 'Estructura de mensajes inválida' });
  }

  // Limitar historial a los últimos 20 mensajes para evitar abusos
  const trimmedMessages = messages.slice(-20);

  const SYSTEM_PROMPT = `Eres el Asistente Virtual Oficial de la Escuela Profesional de Ingeniería de Sistemas de la Universidad Privada de Tacna (UPT). Tu rol es brindar soporte institucional a los egresados de manera formal, precisa y empática.

Áreas de conocimiento que debes cubrir:
- Procesos de titulación: modalidades (tesis, trabajo de suficiencia profesional, etc.), requisitos, cronogramas y trámites administrativos
- Bolsa laboral UPT: registro, oportunidades, convenios con empresas y actualizaciones
- Programas de actualización profesional: diplomados, cursos de extensión, certificaciones
- Convenios institucionales nacionales e internacionales
- Trámites administrativos: certificados de estudios, constancias, duplicados de diploma
- Actividades de la Asociación de Egresados
- Colegiatura y habilitación en el CIP (Colegio de Ingenieros del Perú)

Instrucciones de comportamiento:
- Responde SIEMPRE en español formal pero accesible
- Sé conciso, preciso y útil
- Si no tienes certeza de un dato específico, indícalo claramente y sugiere contactar a la oficina correspondiente
- Usa viñetas o numeración cuando listes información para facilitar la lectura
- Mantén un tono institucional cálido, nunca frío ni robótico`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: trimmedMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error de Anthropic API:', response.status, errorData);
      return res.status(502).json({ error: 'Error al comunicarse con el servicio de IA' });
    }

    const data = await response.json();
    const text = data.content?.find(b => b.type === 'text')?.text;

    if (!text) {
      return res.status(502).json({ error: 'Respuesta inesperada del servicio de IA' });
    }

    return res.status(200).json({ reply: text });

  } catch (err) {
    console.error('Error interno del servidor:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
