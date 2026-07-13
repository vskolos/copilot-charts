import { describe, expect, test } from 'bun:test'

import type { ChartType } from '@/schemas/chart-type-schema.ts'
import type { EntryData } from '@/schemas/entry-data-schema.ts'

import { R_AXIS_KEY, X_AXIS_KEY, Y_AXIS_KEY } from '@/constants/config-keys.ts'
import { OUTPUT_DIR } from '@/constants/export.ts'

import { renderChartImage } from './render-chart-image.ts'

const colEntryData: EntryData = {
  'Series A': { m01: 100, m02: 200, m03: 150 },
  'Series B': { m01: 50, m02: 75, m03: 60 },
}

const rowEntryData: EntryData = {
  'Week 1': { 'Cat A': 100, 'Cat B': 200, 'Cat C': 150 },
}

const bubbleEntryData: EntryData = {
  'Product A': { [X_AXIS_KEY]: 20, [Y_AXIS_KEY]: 30, [R_AXIS_KEY]: 15 },
  'Product B': { [X_AXIS_KEY]: 40, [Y_AXIS_KEY]: 10, [R_AXIS_KEY]: 10 },
}

const colTypes: ChartType[] = [
  'area',
  'line',
  'stacked bar',
  'heatmap',
  'radar',
]

const rowTypes: ChartType[] = ['bar', 'donut', 'treemap', 'polar area']

describe('renderChartImage', () => {
  test('renders all chart types to disk', async () => {
    for (const type of [...colTypes, ...rowTypes]) {
      const data = colTypes.includes(type) ? colEntryData : rowEntryData

      const result = await renderChartImage({
        type,
        data,
        width: 400,
        height: 300,
        format: 'unit',
      })

      const filepath = `${OUTPUT_DIR}/${result.filename}`
      expect(result.filename.endsWith('.png')).toBe(true)
      expect(await Bun.file(filepath).exists()).toBe(true)

      const file = Bun.file(filepath)
      expect(file.size).toBeGreaterThan(1000)
    }
  })

  test('renders bubble chart to disk', async () => {
    const result = await renderChartImage({
      type: 'bubble',
      data: bubbleEntryData,
      width: 400,
      height: 300,
      format: 'unit',
    })

    const filepath = `${OUTPUT_DIR}/${result.filename}`
    expect(result.filename.endsWith('.png')).toBe(true)
    expect(await Bun.file(filepath).exists()).toBe(true)

    const file = Bun.file(filepath)
    expect(file.size).toBeGreaterThan(1000)
  })
})
