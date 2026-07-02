import type { ChartConfiguration, ChartDataset } from 'chart.js'
import type { TreemapDataPoint } from 'chartjs-chart-treemap'

import type { ChartOptions } from '#/types.ts'

import { getChartColor } from '#/charts/get-chart-color.ts'
import { DATA_KEY, VALUE_KEY } from '#/constants/config-keys.ts'
import { INTER_FONT_FAMILY } from '#/constants/export.ts'
import { formatter } from '#/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { maxNumericValue } from './helpers/max-numeric-value.ts'
import { parseRowHeader } from './helpers/parse-row-header.ts'
import { pipe } from './helpers/pipe.ts'

type TreemapItem = { label: string; value: number; color: string | undefined }

type TreemapRaw = TreemapDataPoint & Record<typeof DATA_KEY, TreemapItem>

function isTreemapRaw(value: unknown): value is TreemapRaw {
  return (
    typeof value === 'object' &&
    value !== null &&
    DATA_KEY in value &&
    VALUE_KEY in value
  )
}

export function createTreeMapChartConfig({
  softColors,
  data,
  format,
}: ChartOptions): ChartConfiguration | null {
  const { rows } = data

  if (rows.length < 2) {
    return null
  }

  const parsed = parseRowHeader(rows)

  if (!parsed) {
    return null
  }

  const { header, activeRow } = parsed
  const labels = header.slice(1)
  const values = activeRow.slice(1).map(Number)
  const colors = labels.map((_, index) =>
    getChartColor({ index, softColors, opacity: 0.85 }),
  )

  const dataArray: TreemapItem[] = labels.map((label, index) => ({
    label,
    value: values[index] ?? 0,
    color: colors[index],
  }))

  const maxValue = maxNumericValue(rows.slice(1).flat())

  const datasets = [
    {
      tree: dataArray,
      key: 'value',
      data: [],
      backgroundColor: (ctx) =>
        ctx.type === 'data' && isTreemapRaw(ctx.raw)
          ? (ctx.raw[DATA_KEY].color ?? 'transparent')
          : 'transparent',
      labels: {
        display: true,
        formatter: (ctx) =>
          ctx.type === 'data' && isTreemapRaw(ctx.raw)
            ? ctx.raw[DATA_KEY].label
            : '',
        color: '#fff',
        font: (ctx) => ({
          family: INTER_FONT_FAMILY,
          size:
            isTreemapRaw(ctx.raw) && ctx.raw[VALUE_KEY] > maxValue / 10
              ? 11
              : 8,
          style: 'normal',
          weight: 'normal',
          lineHeight: 1.2,
        }),
      },
    },
  ] satisfies ChartDataset<'treemap', TreemapDataPoint[]>[]

  return pipe(
    defaultConfig({
      type: 'treemap',
      datasets,
      labels: [],
    }),
    addTooltip({
      bodySpacing: 8,
      callbacks: {
        title: () => '',
        label: (ctx) => {
          if (!isTreemapRaw(ctx.raw)) {
            return ''
          }

          let { label } = ctx.raw[DATA_KEY]

          if (label !== '') {
            label += ': '
          }

          label += formatter(format)(ctx.raw[VALUE_KEY])

          return label
        },
      },
    }),
    addLegend(false),
  )
}
