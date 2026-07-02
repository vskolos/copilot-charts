import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import type { EntryData } from '#/schemas/entry-data-schema.ts'

import { createTableData } from './create-table-data.ts'

const colEntryData: EntryData = {
  'Series A': { m01: 100, m02: 200, m03: 150 },
  'Series B': { m01: 50, m02: 75, m03: 60 },
}

void describe('createTableData', () => {
  void test('converts entry data to rows and cols', () => {
    const table = createTableData(colEntryData)

    assert.deepStrictEqual(table.rows[0], ['', 'm01', 'm02', 'm03'])
    assert.strictEqual(table.rows[1]?.[0], 'Series A')
    assert.strictEqual(table.cols[1]?.[0], 'm01')
  })
})
