import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '#/types.ts'

import { formatTooltipLabel } from '#/charts/format-tooltip-label.ts'
import { getChartColor } from '#/charts/get-chart-color.ts'
import { formatter } from '#/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addLineElement } from './helpers/add-line-element.ts'
import { addPointElement } from './helpers/add-point-element.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { addXScaleBorder } from './helpers/add-x-scale-border.ts'
import { addXScaleGrid } from './helpers/add-x-scale-grid.ts'
import { addYScaleBorder } from './helpers/add-y-scale-border.ts'
import { addYScaleTicksFormatter } from './helpers/add-y-scale-ticks-formatter.ts'
import { colLabels } from './helpers/col-labels.ts'
import { pipe } from './helpers/pipe.ts'

export function createLineChartConfig({
  softColors,
  data,
  format,
}: ChartOptions): ChartConfiguration | null {
  const { cols } = data

  if (cols.length === 0) {
    return null
  }

  const labels = colLabels(cols)

  const datasets = cols.slice(1).map((col, colIndex) => {
    const label = col[0] ?? ''
    const values = col.slice(1).map(Number)
    const color = getChartColor({ index: colIndex, softColors })

    return {
      label,
      data: values,
      backgroundColor: color,
      borderColor: color,
    }
  }) satisfies ChartDataset<'line'>[]

  return pipe(
    defaultConfig({ type: 'line', datasets, labels }),
    addPointElement(0),
    addLineElement(2, 0.5),
    addXScaleGrid(false),
    addXScaleBorder(false),
    addYScaleBorder(false),
    addYScaleTicksFormatter(formatter(format, true)),
    addTooltip({
      mode: 'index',
      position: 'nearest',
      intersect: false,
      bodySpacing: 8,
      callbacks: {
        label: (ctx) =>
          formatTooltipLabel.yAxis(format, ctx.dataset.label, ctx.parsed),
      },
    }),
    addLegend(false),
  )
}
