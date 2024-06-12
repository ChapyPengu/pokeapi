export function capitalaze(str) {
  if (str.length === 0)
    return ''
  return str[0].toUpperCase() + str.slice(1, str.length)
}