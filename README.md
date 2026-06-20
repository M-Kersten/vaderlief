# Vaderdag 2026 — Vader & Zoon Wellnessdag

Een mobiele, scroll-gestuurde single-page vertelling die langzaam toewerkt naar
de onthulling van een Vaderdag-cadeau: een wellnessdag samen. Donkere,
terminal-achtige sfeer met witte tekst, groene accenten, zachte fade-ins,
parallax en subtiele 3D-deeltjes die de "stoom" vormen waarin de interface
oplost.

## Tech

- **React + TypeScript** (Vite)
- **React Three Fiber / three.js** — lichte puntenwolk voor diepte & stoom
- **GSAP ScrollTrigger** — scroll-gebaseerde reveals en parallax
- **EmailJS** — formulier zonder eigen backend
- Mobiel eerst, ingesteld op hoge prestaties (beperkt aantal deeltjes,
  `prefers-reduced-motion`-ondersteuning, `100svh`-secties).

## Lokaal draaien

```bash
npm install
npm run dev
```

Open de URL die Vite toont (standaard http://localhost:5173) op je telefoon of
in de mobiele weergave van je browser.

## De e-mail laten werken (EmailJS)

Het formulier onderaan stuurt de gekozen **datum** en het **optionele bericht**
naar jouw inbox via EmailJS — geen server nodig.

1. Maak een gratis account op <https://www.emailjs.com/>.
2. Voeg een **Email Service** toe (bv. Gmail) → noteer de **Service ID**.
3. Maak een **Email Template** met de variabelen `{{datum}}` en `{{bericht}}`
   (en eventueel `{{datum_iso}}`). Zet jouw eigen e-mailadres als ontvanger →
   noteer de **Template ID**.
4. Kopieer je **Public Key** (Account → API Keys).
5. Maak een bestand `.env` (kopieer `.env.example`) en vul in:

   ```env
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```

6. Herstart `npm run dev` of bouw opnieuw.

> Zonder sleutels werkt de hele ervaring gewoon en toont het formulier de
> succesanimatie, maar wordt er geen e-mail verstuurd (je ziet een hint in de
> console). Zo kun je alles testen voordat je de sleutels invult.

## Bouwen & hosten

```bash
npm run build      # output in dist/
npm run preview    # lokaal de productiebuild bekijken
```

De `dist/`-map is statische hosting (Vercel, Netlify, GitHub Pages, …). Zet je
EmailJS-sleutels als environment-variabelen bij je hostingprovider, of in een
`.env` vóór de build. Deel daarna de link met je vader. 💚

## Structuur

```
src/
  three/        Background-canvas + deeltjesveld (stoom/diepte)
  components/   Herbruikbaar: Reveal, Terminal, ExecList, DissolveText
  hooks/        useReveal (ScrollTrigger-fade)
  sections/     De negen verhaalsecties in volgorde
  config.ts     EmailJS-configuratie
  App.tsx       Zet de secties op één pagina + scroll-voortgang
```
