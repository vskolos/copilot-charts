import { describe, expect, test } from 'bun:test'

import type { ChartType } from '@/schemas/chart-type-schema.ts'
import type { EntryData } from '@/schemas/entry-data-schema.ts'

import { X_AXIS_KEY, Y_AXIS_KEY, R_AXIS_KEY } from '@/constants/config-keys.ts'
import { createTableData } from '@/format/create-table-data.ts'

import { createChartConfig } from './create-chart-config.ts'

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

describe('createChartConfig', () => {
  for (const type of colTypes) {
    test(`builds config for ${type}`, () => {
      const config = createChartConfig(type)({
        softColors: false,
        data: createTableData(colEntryData),
        format: 'unit',
      })

      expect(config).not.toBeNull()
      expect(config?.type).toBeTruthy()
    })
  }

  for (const type of rowTypes) {
    test(`builds config for ${type}`, () => {
      const config = createChartConfig(type)({
        softColors: true,
        data: createTableData(rowEntryData),
        format: 'money',
      })

      expect(config).not.toBeNull()
    })
  }

  test('builds config for bubble', () => {
    const config = createChartConfig('bubble')({
      softColors: false,
      data: createTableData(bubbleEntryData),
      format: 'unit',
    })

    expect(config).not.toBeNull()
    expect(config?.type).toBe('bubble')
  })

  test('returns null for bubble without x/y/r columns', () => {
    const config = createChartConfig('bubble')({
      softColors: false,
      data: createTableData(rowEntryData),
      format: 'unit',
    })

    expect(config).toBeNull()
  })

  test('returns null for empty data', () => {
    const config = createChartConfig('bar')({
      softColors: false,
      data: { columnHeaders: [], rowHeaders: [], values: [] },
      format: 'unit',
    })

    expect(config).toBeNull()
  })
})
