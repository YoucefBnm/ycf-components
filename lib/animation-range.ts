export function animationRange(index: number, arrayLength: number) {
  const start = index / arrayLength
  const end = start + 1 / arrayLength

  const range = [start, end]
  return range
}
