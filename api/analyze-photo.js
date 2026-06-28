export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { imageUrl } = await req.json();

  const prompt = `Sei un assistente per Waglo, marketplace italiano di prodotti usati per animali domestici.
Analizza questa foto e restituisci SOLO un oggetto JSON valido, senza testo aggiuntivo.

Identifica il prodotto nella foto e suggerisci:
- title: titolo breve e descrittivo del prodotto (max 60 caratteri, in italiano, es. "Cuccia da interno taglia M")
- category: una sola tra queste esatte opzioni: "alimenti", "accessori", "integratori", "igiene", "antiparassitari", "altro"
- animal_type: array con uno o più tra: "cani", "gatti", "uccelli", "pesci", "roditori", "rettili", "conigli", "cavalli", "altri"
- condition: una sola tra: "nuovo", "ottimo", "buono", "accettabile", "danneggiato"
- photo_quality: "buona" o "scarsa"
- quality_message: se photo_quality è "scarsa", scrivi un messaggio breve in italiano che spiega il problema (es. "Foto sfocata — i campi non sono stati precompilati. Carica una foto più nitida per ottenere suggerimenti automatici."). Se "buona", lascia stringa vuota.

Se la foto è sfocata, troppo scura, o non permette di identificare chiaramente il prodotto, imposta photo_quality su "scarsa" e NON compilare title, category, animal_type, condition — lasciali null.

Rispondi SOLO con JSON in questo formato esatto:
{"title": "...", "category": "...", "animal_type": [...], "condition": "...", "photo_quality": "buona", "quality_message": ""}`;

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
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'url',
              url: imageUrl
            }
          },
          { type: 'text', text: prompt }
        ]
      }]
    })
  });

  const data = await response.json();
  const text = data?.content?.[0]?.text || '{"photo_quality": "scarsa", "quality_message": "Impossibile analizzare la foto. Riprova."}';

  try {
    const result = JSON.parse(text);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      photo_quality: 'scarsa',
      quality_message: `Errore: ${err.message}`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
