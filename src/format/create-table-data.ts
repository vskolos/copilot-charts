import type { EntryData } from '@/schemas/entry-data-schema.ts'
import type { TableData } from '@/types.ts'

export function createTableData(data: EntryData): TableData {
  const entries = Object.entries(data)
  const [firstEntry] = entries
  const columnHeaders = firstEntry ? Object.keys(firstEntry[1]) : []
  const rowHeaders = entries.map(([key]) => key)
  const values = entries.map(([, inner]) => Object.values(inner))

  return { columnHeaders, rowHeaders, values }
}
