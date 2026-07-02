import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import type { ChartType } from '#/schemas/chart-type-schema.ts'
import type { EntryData } from '#/schemas/entry-data-schema.ts'

import { createTableData } from '#/format/create-table-data.ts'

import { createChartConfig } from './create-chart-config.ts'

const colEntryData: EntryData = {
  'Series A': { m01: 100, m02: 200, m03: 150 },
  'Series B': { m01: 50, m02: 75, m03: 60 },
}

const rowEntryData: EntryData = {
  'Week 1': { 'Cat A': 100, 'Cat B': 200, 'Cat C': 150 },
}

const colTypes: ChartType[] = ['area', 'line', 'stacked bar', 'heatmap']
const rowTypes: ChartType[] = ['bar', 'donut', 'radar', 'treemap']

void describe('createChartConfig', () => {
  for (const type of colTypes) {
    void test(`builds config for ${type}`, () => {
      const config = createChartConfig(type)({
        softColors: false,
        data: createTableData(colEntryData),
        format: 'unit',
      })

      assert.notStrictEqual(config, null)
      assert.ok(config?.type)
    })
  }

  for (const type of rowTypes) {
    void test(`builds config for ${type}`, () => {
      const config = createChartConfig(type)({
        softColors: true,
        data: createTableData(rowEntryData),
        format: 'money',
      })

      assert.notStrictEqual(config, null)
    })
  }

  void test('returns null for empty data', () => {
    const config = createChartConfig('bar')({
      softColors: false,
      data: { rows: [], cols: [] },
      format: 'unit',
    })

    assert.strictEqual(config, null)
  })
})
