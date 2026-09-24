const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'openai/gpt-oss-120b';

export async function chatJSON<T>(system: string, user: string, signal?: AbortSignal): Promise<T> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not set in .env.local');

  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      signal,
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: `${system}\nRespond ONLY with valid JSON.` },
          { role: 'user', content: user },
        ],
      }),
    });

    if (res.status === 429 && attempt < 2) {
      const wait = Number(res.headers.get('retry-after')) || 2 ** attempt * 2;
      await new Promise((r) => setTimeout(r, Math.min(wait, 20) * 1000));
      continue;
    }
    if (!res.ok) throw new Error(`Groq API error (${res.status}): ${(await res.text()).slice(0, 200)}`);

    const data = await res.json();
    try {
      return JSON.parse(data.choices[0].message.content) as T;
    } catch {
      if (attempt === 2) throw new Error('Model returned malformed JSON');
    }
  }
  throw new Error('Groq request failed');
}
