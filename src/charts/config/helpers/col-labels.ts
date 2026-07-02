export function colLabels(cols: string[][]): string[] {
  const [header] = cols

  if (!header) {
    return []
  }

  return header.slice(1)
}
