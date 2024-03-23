export function convertNumber (value: number) {
  if (value >= 1000000) return `${(value / 1000000).toPrecision(2)} M`
  if (value >= 1000) return `${(value / 1000).toPrecision(2)} K`

  return String(value)
}
