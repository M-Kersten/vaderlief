// EmailJS-configuratie.
//
// Het formulier verstuurt via EmailJS, dus er is geen eigen backend nodig.
// Maak een gratis account op https://www.emailjs.com/ en vul hieronder
// (of liever via een .env-bestand) je eigen sleutels in.
//
// Stappen:
//   1. Voeg een "Email Service" toe (bv. Gmail) -> kopieer de Service ID.
//   2. Maak een "Email Template" met de variabelen {{datum}} en {{bericht}}.
//      Zet als ontvanger jouw eigen e-mailadres.            -> Template ID.
//   3. Kopieer je "Public Key" uit Account -> API Keys.
//
// Vul ze in via een .env-bestand (zie .env.example) zodat ze niet in git
// belanden, of hardcode ze hieronder als fallback.

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
}

export function isEmailConfigured(): boolean {
  return Boolean(
    emailjsConfig.serviceId &&
      emailjsConfig.templateId &&
      emailjsConfig.publicKey,
  )
}
