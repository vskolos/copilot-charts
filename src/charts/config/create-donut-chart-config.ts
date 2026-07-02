import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '#/types.ts'

import { formatTooltipLabel } from '#/charts/format-tooltip-label.ts'
import { getChartColor } from '#/charts/get-chart-color.ts'
import { createDonutLabelsPlugin } from '#/charts/plugins/create-donut-labels-plugin.ts'

import { defaultConfig } from './default-config.ts'
import { addCutout } from './helpers/add-cutout.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addPlugins } from './helpers/add-plugins.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { parseRowHeader } from './helpers/parse-row-header.ts'
import { pipe } from './helpers/pipe.ts'

export function createDonutChartConfig({
  data,
  format,
  softColors,
  labelThreshold = 0.05,
}: ChartOptions): ChartConfiguration | null {
  const parsed = parseRowHeader(data.rows)

  if (!parsed) {
    return null
  }

  const { header, activeRow } = parsed
  const labels = header.slice(1)
  const values = activeRow.slice(1).map(Number)

  if (values.length === 0) {
    return null
  }

  const colors = values.map((_, index) => getChartColor({ index, softColors }))

  const datasets = [
    {
      data: values,
      backgroundColor: colors,
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
