// /api/chat.js — Vercel Serverless Function
// Proxy requests to Google Gemini API
// API key stored in Vercel Environment Variables: GEMINI_API_KEY

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  try {
    const { messages, system } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Convert from Anthropic format to Gemini format
    // Anthropic: { role: "user"|"assistant", content: "..." }
    // Gemini:    { role: "user"|"model",     parts: [{ text: "..." }] }
    const geminiContents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const geminiBody = {
      contents: geminiContents,
      systemInstruction: {
        parts: [{ text: system || '' }]
      },
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7
      }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', response.status, errText);
      return res.status(response.status).json({ error: 'API request failed', detail: errText });
    }

    const data = await response.json();

    // Extract reply text from Gemini response
    const text = data?.candidates?.[0]?.content?.parts
      ?.map(p => p.text)
      ?.join('\n')
      ?.trim() || '';

    // Return in Anthropic-compatible format so frontend works unchanged
    return res.status(200).json({
      content: [{ type: 'text', text: text }]
    });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
