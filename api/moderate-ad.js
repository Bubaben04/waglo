export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { title, description, category, condition } = await req.json();

  const prompt = `Sei un moderatore per Waglo, marketplace italiano di prodotti usati per animali domestici.
Analizza questo annuncio e rispondi SOLO con un oggetto JSON valido, senza testo aggiuntivo.

Titolo: ${title}
Descrizione: ${description || "non fornita"}
Categoria: ${category || "non specificata"}
Condizione: ${condition || "non specificata"}

Blocca l'annuncio se contiene almeno uno di questi segnali:
- Vendita di animali vivi (cuccioli, gattini, conigli, uccelli, pesci vivi, ecc.)
- Riproduzione o allevamento (parole chiave: cuccioli, cucciolata, nati, stallone, monta)
- Farmaci veterinari con obbligo di ricetta
- Linguaggio osceno o offensivo esplicito
- Contenuti completamente estranei agli animali domestici

Per tutto il resto approva.

Rispondi SOLO con questo JSON:
{"approved": true, "reason": ""}
oppure
{"approved": false, "reason": "Motivo breve in italiano"}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  const text = data?.content?.[0]?.text || '{"approved": true, "reason": ""}';

  try {
    const result = JSON.parse(text);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ approved: true, reason: "" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
