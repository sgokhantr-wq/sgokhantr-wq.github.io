// synthetic — no real jobs, customers, people or dollars
export const TOPIC = 'RTU replacement — distribution center'

/** 25 characters: under the 27-character worst case the pinned banner was sized to. */
export const PINNED_LINE = 'RTU repl · DC · 62% · 48h'

export const BARS = {
  done: { filled: 5, label: '62% done' },
  hours: { filled: 4, label: '48% hours' },
}

export interface Msg {
  who: string
  time: string
  text: string
  kind: 'crew' | 'ai' | 'button' | 'reply' | 'dm' | 'pace'
}

export const MESSAGES: Msg[] = [
  { who: 'Crew 3', time: '07:12', text: 'curbs set on units 1–3', kind: 'crew' },
  { who: 'Centaurus · photo insight', time: '07:14', text: 'two curb adapters set, duct open, no condensate line yet', kind: 'ai' },
  { who: 'Crew 3', time: '15:40', text: 'Good to invoice', kind: 'button' },
  { who: 'Office bot', time: '15:40', text: 'sent · tap to undo', kind: 'reply' },
  { who: 'Tech A · direct message', time: '16:05', text: 'Horas corregidas: 07:00–15:30 trabajo · 15:30–16:00 viaje — enviado a la oficina', kind: 'dm' },
  { who: 'Pace', time: '06:30', text: '3 jobs closed yesterday, 2 behind plan', kind: 'pace' },
]
