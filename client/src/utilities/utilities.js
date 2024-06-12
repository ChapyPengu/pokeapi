export async function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}

export function random(start, end) {
  return start + Math.floor(Math.random() * (end - start))
}