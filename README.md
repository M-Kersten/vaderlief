# Vaderdag 2026 — Vader & Zoon Dag

Een mobiele, scroll-gestuurde single-page vertelling die langzaam toewerkt naar
de onthulling van een Vaderdag-cadeau: een dag samen. Donkere, terminal-/
Matrix-achtige sfeer met groene digital rain, witte tekst, zachte fade-ins en
subtiele 3D-deeltjes (de "stoom" waarin de interface oplost). Aan het eind kiest
pa zelf zijn cadeau en zet hij met één tik een mailtje klaar.

## Tech

- **React + TypeScript** (Vite)
- **Matrix digital rain** — subtiel, zuinig 2D-canvas dat vervaagt richting de
  onthulling (geen zware 3D meer; klein bundeltje)
- **GSAP ScrollTrigger** — scroll-gebaseerde reveals en parallax
- **Discord-webhook** — bij versturen krijg je meteen een seintje met de keuze
  en datum (met `mailto:` als terugval)
- Mobiel eerst (`prefers-reduced-motion`, `100svh`-secties).

## Lokaal draaien

```bash
npm install
npm run dev
```

Open de URL die Vite toont (standaard http://localhost:5173) op je telefoon of
in de mobiele weergave van je browser.

## Het seintje (Discord-webhook)

Onderaan kiest pa een cadeau en (waar relevant) een datum. Bij **Verzoek
versturen** stuurt de site een berichtje naar jouw Discord — je krijgt meteen
een melding met het cadeau, de datum en zijn bericht.

1. In Discord: **Serverinstellingen → Integraties → Webhooks → Nieuwe
   webhook**, kies een kanaal en klik **"Webhook-URL kopiëren"**.
2. Zet die URL in een `.env` (kopieer `.env.example`):

   ```env
   VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/....
   ```

3. Herstart `npm run dev` of bouw opnieuw.

> **Terugval:** is er geen webhook ingesteld (of lukt het versturen niet), dan
> opent het formulier netjes de mailapp (`mailto:`) naar het adres in `TO` boven
> in `src/sections/Formulier.tsx`. Zo gaat een verzoek nooit verloren.
>
> De webhook-URL komt bij een statische build in de JS terecht. Voor een
> persoonlijk cadeau is dat prima; bij misbruik verwijder je 'm in Discord en
> maak je een nieuwe aan.

**Datum is afhankelijk van het cadeau:** wellnessdag = kies een dag, dagje stad
= mag ook meerdere dagen, verrassingsconcert = geen datum (dat blijft een
verrassing).

## Persoonlijk spraakbericht (MP3)

Bij de onthulling staat een spelertje met een berichtje van jou. Zet je opname
als **`public/papa-bericht.mp3`**. Zolang dat bestand er niet is, toont de
speler netjes "berichtje volgt". Andere naam? Pas `SRC` aan in
`src/components/AudioMessage.tsx`.

## Cadeau-keuze

Pa kiest zelf uit drie cadeaus (wellnessdag, verrassingsconcert, dagje stad).
De opties (titel, omschrijving, icoon) pas je aan in `src/gifts.ts`.

## Hosten op GitHub Pages (Actions)

De workflow `.github/workflows/deploy.yml` bouwt de site en publiceert `dist/`.

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Zet je Discord-webhook als **repository-secret** (Settings → Secrets and
   variables → Actions → New secret): `VITE_DISCORD_WEBHOOK_URL`. De build
   gebruikt 'm automatisch. (Niet ingesteld? Dan valt de site terug op mailto.)
3. Elke push naar de geconfigureerde branch (of via "Run workflow") deployt.
   De site komt op `https://m-kersten.github.io/vaderlief/`.

> De Vite-build gebruikt relatieve asset-paden (`base: './'`), dus dit werkt
> meteen op het `…/vaderlief/`-subpad van Pages — geen extra config nodig.

### Andere hosting

```bash
npm run build      # output in dist/  (statische map)
npm run preview    # lokaal de productiebuild bekijken
```

`dist/` werkt op elke statische host (Vercel, Netlify, …). Deel daarna de link
met je vader. 💚

## Structuur

```
src/
  components/   MatrixRain, Reveal, Terminal, ExecList, DissolveText,
                GiftPicker, AudioMessage, InstallBar
  hooks/        useReveal (ScrollTrigger-fade)
  sections/     De verhaalsecties in volgorde
  gifts.ts      De drie cadeau-opties
  notify.ts     Discord-webhook (het "seintje")
  App.tsx       Zet de secties op één pagina + scroll-voortgang
```
