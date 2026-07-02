import assert from 'node:assert/strict'
import { access, stat } from 'node:fs/promises'
import { describe, test } from 'node:test'

import type { ChartType } from '#/schemas/chart-type-schema.ts'
import type { EntryData } from '#/schemas/entry-data-schema.ts'

import { OUTPUT_DIR } from '#/constants/export.ts'

import { renderChartImage } from './render-chart-image.ts'

const colEntryData: EntryData = {
  'Series A': { m01: 100, m02: 200, m03: 150 },
  'Series B': { m01: 50, m02: 75, m03: 60 },
}

const rowEntryData: EntryData = {
  'Week 1': { 'Cat A': 100, 'Cat B': 200, 'Cat C': 150 },
}

const colTypes: ChartType[] = ['area', 'line', 'stacked bar', 'heatmap']
const rowTypes: ChartType[] = ['bar', 'donut', 'radar', 'treemap']

void describe('renderChartImage', () => {
  void test('renders all chart types to disk', async () => {
    for (const type of [...colTypes, ...rowTypes]) {
      const data = colTypes.includes(type) ? colEntryData : rowEntryData

      const result = await renderChartImage({
        type,
        data,
        width: 400,
        height: 300,
        format: 'unit',
        softColors: false,
      })

      const filepath = `${OUTPUT_DIR}/${result.filename}`
      assert.strictEqual(result.filename.endsWith('.png'), true)
      await access(filepath)

      const { size } = await stat(filepath)
      assert.ok(size > 1000)
    }
  })
})
