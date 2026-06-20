// Lichtgewicht, render-vrije store voor scroll-voortgang.
// Het 3D-canvas leest dit elke frame uit zonder React opnieuw te renderen.
// progress: 0 (bovenaan) -> 1 (onderaan van de hele pagina)

export const scrollState = {
  progress: 0,
  velocity: 0,
}

export function setScrollProgress(p: number, velocity = 0) {
  scrollState.progress = p
  scrollState.velocity = velocity
}
