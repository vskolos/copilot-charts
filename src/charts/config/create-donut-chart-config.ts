import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '@/types.ts'

import { formatTooltipLabel } from '@/charts/format-tooltip-label.ts'
import { getChartColor } from '@/charts/get-chart-color.ts'
import { createDonutLabelsPlugin } from '@/charts/plugins/create-donut-labels-plugin.ts'
import { CHART_STROKE_WIDTH } from '@/constants/chart-style.ts'

import { defaultConfig } from './default-config.ts'
import { addCutout } from './helpers/add-cutout.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addPlugins } from './helpers/add-plugins.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { pipe } from './helpers/pipe.ts'

export function createDonutChartConfig({
  data,
  format,
  labelThreshold = 0.05,
}: ChartOptions): ChartConfiguration | null {
  const { columnHeaders, rowHeaders, values } = data

  if (rowHeaders.length === 0) {
    return null
  }

  const labels = columnHeaders
  const rowValues = values[0] ?? []

  if (rowValues.length === 0) {
    return null
  }

  const colors = rowValues.map((_, index) => getChartColor({ index }))

  const datasets = [
    {
      data: rowValues,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: CHART_STROKE_WIDTH,
      hoverBorderWidth: 0,
    },
  ] satisfies ChartDataset<'doughnut'>[]

  return pipe(
    defaultConfig({ type: 'doughnut', datasets, labels }),
    addCutout('65%'),
    addPlugins([createDonutLabelsPlugin(labelThreshold)]),
    addTooltip({
      bodySpacing: 8,
      callbacks: {
        label: (ctx) =>
          formatTooltipLabel.scalar(format, ctx.label, ctx.parsed),
      },
    }),
    addLegend(false),
  )
}
