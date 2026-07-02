export function parseRowHeader(
  rows: string[][],
): { header: string[]; activeRow: string[] } | null {
  const [header, activeRow] = rows

  if (!header || !activeRow) {
    return null
  }

  return { header, activeRow }
}
