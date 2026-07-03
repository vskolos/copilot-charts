import { describe, expect, test } from 'bun:test'

import type { EntryData } from '@/schemas/entry-data-schema.ts'

import { createTableData } from './create-table-data.ts'

const colEntryData: EntryData = {
  'Series A': { m01: 100, m02: 200, m03: 150 },
  'Series B': { m01: 50, m02: 75, m03: 60 },
}

describe('createTableData', () => {
  test('converts entry data to structured table', () => {
    const table = createTableData(colEntryData)

    expect(table.columnHeaders).toEqual(['m01', 'm02', 'm03'])
    expect(table.rowHeaders).toEqual(['Series A', 'Series B'])
    expect(table.values[0]).toEqual([100, 200, 150])
    expect(table.values[1]).toEqual([50, 75, 60])
  })
})
