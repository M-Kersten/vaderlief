// "Seintje" via een Discord-webhook — geen backend nodig.
//
// Zet de webhook-URL in een .env-bestand (zie .env.example):
//   VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/....
//
// Maak 'm in Discord aan: Serverinstellingen -> Integraties -> Webhooks ->
// Nieuwe webhook -> kies een kanaal -> "Webhook-URL kopiëren".
//
// Let op: bij een statische site komt deze URL in de gebundelde JS terecht.
// Voor een persoonlijk cadeau is dat prima; mocht iemand 'm misbruiken, dan
// verwijder je de webhook in Discord en maak je een nieuwe aan.

const WEBHOOK = (import.meta.env.VITE_DISCORD_WEBHOOK_URL ?? '').trim()

export function isDiscordConfigured(): boolean {
  return /^https:\/\/(discord|discordapp)\.com\/api\/webhooks\//.test(WEBHOOK)
}

export type Verzoek = {
  cadeau: string
  datum: string
  bericht: string
}

/** Stuurt het verzoek als nette embed naar Discord. Geeft true bij succes. */
export async function sendToDiscord(v: Verzoek): Promise<boolean> {
  if (!isDiscordConfigured()) return false

  const payload = {
    username: 'Vaderdag-bot',
    content: '🎁 **Nieuw verzoek voor onze Vader & Zoon Dag!**',
    embeds: [
      {
        color: 0x46e6a0,
        fields: [
          { name: 'Cadeau', value: v.cadeau || '—', inline: false },
          { name: 'Datum', value: v.datum || '—', inline: false },
          { name: 'Bericht', value: v.bericht || '—', inline: false },
        ],
        footer: { text: 'via de Vaderdag-site' },
        timestamp: new Date().toISOString(),
      },
    ],
  }

  try {
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    // Discord antwoordt met 204 No Content bij succes.
    return res.ok
  } catch {
    return false
  }
}
