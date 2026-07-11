import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '@/types.ts'

import { formatTooltipLabel } from '@/charts/format-tooltip-label.ts'
import { getChartColor } from '@/charts/get-chart-color.ts'
import { CHART_STROKE_WIDTH } from '@/constants/chart-style.ts'
import { formatter } from '@/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addLineElement } from './helpers/add-line-element.ts'
import { addRScaleTicksFormatter } from './helpers/add-r-scale-ticks-formatter.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { pipe } from './helpers/pipe.ts'

export function createRadarChartConfig({
  softColors,
  data,
  format,
}: ChartOptions): ChartConfiguration | null {
  const { columnHeaders, rowHeaders, values } = data

  if (rowHeaders.length === 0) {
    return null
  }

  const labels = columnHeaders.toReversed()

  const datasets = rowHeaders.map((label, rowIndex) => {
    const color = getChartColor({ index: rowIndex, softColors })

    return {
      label,
      data: values[rowIndex]?.toReversed() ?? [],
      backgroundColor: getChartColor({
        index: rowIndex,
        softColors,
        opacity: 0.3,
      }),
      borderColor: color,
      pointRadius: CHART_STROKE_WIDTH,
    }
  }) satisfies ChartDataset<'radar'>[]

  return pipe(
    defaultConfig({ type: 'radar', datasets, labels }),
    addRScaleTicksFormatter(formatter(format, true)),
    addLineElement(CHART_STROKE_WIDTH),
    addTooltip({
      mode: 'index',
      position: 'nearest',
      intersect: false,
      bodySpacing: 8,
      callbacks: {
        label: (ctx) =>
          formatTooltipLabel.radial(format, ctx.dataset.label, ctx.parsed),
      },
    }),
    addLegend(false),
  )
}
