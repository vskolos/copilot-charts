import { describe, expect, test } from 'bun:test'

import type { EntryData } from '@/schemas/entry-data-schema.ts'

import { createTableData } from './create-table-data.ts'

const colEntryData: EntryData = {
  'Series A': { m01: 100, m02: 200, m03: 150 },
  'Series B': { m01: 50, m02: 75, m03: 60 },
}

describe('createTableData', () => {
  test('converts entry data to rows and cols', () => {
    const table = createTableData(colEntryData)

    expect(table.rows[0]).toEqual(['', 'm01', 'm02', 'm03'])
    expect(table.rows[1]?.[0]).toBe('Series A')
    expect(table.cols[1]?.[0]).toBe('m01')
  })
})
