export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { title, animal_type, category, condition } = await req.json();

  const prompt = `Sei un assistente per Waglo, marketplace italiano di prodotti usati per animali. Scrivi una descrizione realistica in italiano per un annuncio privato di un oggetto usato. Massimo 3 frasi, tono neutro e diretto, niente emoji, niente slogan, niente esclamativi. Scrivi come scriverebbe un privato che descrive onestamente il prodotto.\nTitolo: ${title}${animal_type ? `\nAnimale: ${animal_type}` : ""}${category ? `\nCategoria: ${category}` : ""}${condition ? `\nCondizione: ${condition}` : ""}\nRispondi solo con la descrizione, senza titolo ne premesse.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  const text = data?.content?.[0]?.text || "";

  return new Response(JSON.stringify({ description: text }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
