import type { EntryData } from '@/schemas/entry-data-schema.ts'
import type { TableData } from '@/types.ts'

function transpose(array: string[][]) {
  if (array.length === 0 || !array[0]?.length) {
    return []
  }

  const transposed: string[][] = Array.from(
    { length: array[0].length },
    () => [],
  )

  for (const [rowIndex, row] of array.entries()) {
    for (const [columnIndex, column] of row.entries()) {
      const target = transposed[columnIndex]
      if (target) {
        target[rowIndex] = column
      }
    }
  }

  return transposed
}

export function createTableData(
  data: EntryData,
  cornerText?: string,
): TableData {
  const rows: string[][] = []

  for (const [outerIndex, outerEntry] of Object.entries(data).entries()) {
    rows.push([outerEntry[0]])

    for (const innerValue of Object.values(outerEntry[1])) {
      const row = rows[outerIndex]
      if (row) {
        row.push(`${innerValue ?? 0}`)
      }
    }
  }

  const [firstEntry] = Object.values(data)
  const headersRow = [cornerText ?? '']
  if (firstEntry) {
    for (const key of Object.keys(firstEntry)) {
      headersRow.push(key)
    }
  }
  rows.unshift(headersRow)

  return { rows, cols: transpose(rows) }
}
