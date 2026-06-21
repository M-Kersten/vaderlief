export type Gift = {
  id: string
  /** Wat in de e-mail/het seintje terechtkomt. */
  label: string
  title: string
  desc: string
}

export const GIFTS: Gift[] = [
  {
    id: 'wellness',
    label: 'Wellness- / saunadag',
    title: 'Wellnessdag',
    desc: 'Sauna, zoals we dat vaker doen',
  },
  {
    id: 'concert',
    label: 'Verrassingsconcert',
    title: 'Verrassingsconcert',
    desc: 'Samen naar een concert, ik ga er eentje uitzoeken!',
  },
  {
    id: 'stad',
    label: 'Dagje uit naar een stad',
    title: 'Dagje stad',
    desc: 'Een nieuwe plek ontdekken en een hapje eten daar',
  },
]
