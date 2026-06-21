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
    desc: 'Sauna, rust en even helemaal niets hoeven. Opladen samen.',
  },
  {
    id: 'concert',
    label: 'Verrassingsconcert',
    title: 'Verrassingsconcert',
    desc: 'Samen naar live muziek — want dat zit bij jou in het bloed.',
  },
  {
    id: 'stad',
    label: 'Dagje uit naar een stad',
    title: 'Dagje stad',
    desc: 'Ergens rondlopen, goed eten en een terrasje pakken. Net als vroeger in Arnhem.',
  },
]
