# Vaderdag 2026 — Vader & Zoon Dag

Een mobiele, scroll-gestuurde single-page vertelling die langzaam toewerkt naar
de onthulling van een Vaderdag-cadeau: een dag samen. Donkere, terminal-/
Matrix-achtige sfeer met groene digital rain, witte tekst, zachte fade-ins en
subtiele 3D-deeltjes (de "stoom" waarin de interface oplost). Aan het eind kiest
pa zelf zijn cadeau en zet hij met één tik een mailtje klaar.

## Tech

- **React + TypeScript** (Vite)
- **React Three Fiber / three.js** — lichte puntenwolk voor diepte & stoom
- **Matrix digital rain** — zuinig 2D-canvas dat vervaagt richting de onthulling
- **GSAP ScrollTrigger** — scroll-gebaseerde reveals en parallax
- **`mailto:`** — geen backend, geen sleutels: het formulier opent de mailapp
- Mobiel eerst (beperkt aantal deeltjes, `prefers-reduced-motion`, `100svh`).

## Lokaal draaien

```bash
npm install
npm run dev
```

Open de URL die Vite toont (standaard http://localhost:5173) op je telefoon of
in de mobiele weergave van je browser.

## Het formulier (mailto — geen account nodig)

Onderaan kiest pa een cadeau en (waar relevant) een datum. Bij **Verzoek
versturen** opent zijn eigen mailapp met alles al ingevuld; hij hoeft alleen op
verzenden te tikken. Het mailtje komt dan bij jou binnen.

- Ontvanger aanpassen: zet je adres in `TO` boven in
  `src/sections/Formulier.tsx` (nu `info@merijnkersten.nl`).
- **Datum is afhankelijk van het cadeau:** wellnessdag = kies een dag,
  dagje stad = mag ook meerdere dagen, verrassingsconcert = geen datum (dat
  blijft een verrassing).

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
Er zijn geen secrets meer nodig (alles loopt via `mailto:`).

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Elke push naar de geconfigureerde branch (of via "Run workflow") deployt.
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
  three/        Background-canvas + deeltjesveld (stoom) + MatrixRain
  components/   Reveal, Terminal, ExecList, DissolveText, GiftPicker,
                AudioMessage, InstallBar
  hooks/        useReveal (ScrollTrigger-fade)
  sections/     De verhaalsecties in volgorde
  gifts.ts      De drie cadeau-opties
  App.tsx       Zet de secties op één pagina + scroll-voortgang
```
