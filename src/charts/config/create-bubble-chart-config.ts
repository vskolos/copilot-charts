import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '@/types.ts'

import { formatTooltipLabel } from '@/charts/format-tooltip-label.ts'
import { getChartColor } from '@/charts/get-chart-color.ts'
import { R_AXIS_KEY, X_AXIS_KEY, Y_AXIS_KEY } from '@/constants/config-keys.ts'
import { CHART_STROKE_WIDTH } from '@/constants/chart-style.ts'
import { formatter } from '@/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { addXScaleBorder } from './helpers/add-x-scale-border.ts'
import { addXScaleGrid } from './helpers/add-x-scale-grid.ts'
import { addXScaleTicksFormatter } from './helpers/add-x-scale-ticks-formatter.ts'
import { addYScaleBorder } from './helpers/add-y-scale-border.ts'
import { addYScaleTicksFormatter } from './helpers/add-y-scale-ticks-formatter.ts'
import { pipe } from './helpers/pipe.ts'

function columnIndex(headers: string[], name: string): number {
  return headers.indexOf(name)
}

export function createBubbleChartConfig({
  softColors,
  data,
  format,
}: ChartOptions): ChartConfiguration | null {
  const { columnHeaders, rowHeaders, values } = data

  if (rowHeaders.length === 0) {
    return null
  }

  const xIndex = columnIndex(columnHeaders, X_AXIS_KEY)
  const yIndex = columnIndex(columnHeaders, Y_AXIS_KEY)
  const rIndex = columnIndex(columnHeaders, R_AXIS_KEY)

  if (xIndex === -1 || yIndex === -1 || rIndex === -1) {
    return null
  }

  const datasets = rowHeaders.map((label, rowIndex) => {
    const row = values[rowIndex] ?? []
    const color = getChartColor({ index: rowIndex, softColors })

    return {
      label,
      data: [
        {
          [X_AXIS_KEY]: row[xIndex] ?? 0,
          [Y_AXIS_KEY]: row[yIndex] ?? 0,
          [R_AXIS_KEY]: row[rIndex] ?? 0,
        },
      ],
      backgroundColor: getChartColor({
        index: rowIndex,
        softColors,
        opacity: 0.3,
      }),
      borderColor: color,
      borderWidth: CHART_STROKE_WIDTH,
    }
  }) satisfies ChartDataset<'bubble'>[]

  return pipe(
    defaultConfig({ type: 'bubble', datasets, labels: [] }),
    addXScaleGrid(false),
    addXScaleBorder(false),
    addYScaleBorder(false),
    addXScaleTicksFormatter(formatter(format, true)),
    addYScaleTicksFormatter(formatter(format, true)),
    addTooltip({
      bodySpacing: 8,
      callbacks: {
        label: (ctx) =>
          formatTooltipLabel.bubble(format, ctx.dataset.label, ctx.raw),
      },
    }),
    addLegend(false),
  )
}
