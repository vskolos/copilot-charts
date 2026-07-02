export function maxNumericValue(values: (string | number)[]): number {
  let max = 0

  for (const value of values) {
    const numeric = Number(value)

    if (numeric > max) {
      max = numeric
    }
  }

  return max
}
