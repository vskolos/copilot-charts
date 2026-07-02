import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '#/types.ts'

import { formatTooltipLabel } from '#/charts/format-tooltip-label.ts'
import { getChartColor } from '#/charts/get-chart-color.ts'
import { chartDataLabelsPlugin } from '#/charts/plugins/chart-data-labels-plugin.ts'
import { INTER_FONT_FAMILY } from '#/constants/export.ts'
import { formatter } from '#/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addChartPadding } from './helpers/add-chart-padding.ts'
import { addDataLabels } from './helpers/add-data-labels.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addPlugins } from './helpers/add-plugins.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { addXScaleBorder } from './helpers/add-x-scale-border.ts'
import { addXScaleGrid } from './helpers/add-x-scale-grid.ts'
import { addYScaleBorder } from './helpers/add-y-scale-border.ts'
import { addYScaleTicksFormatter } from './helpers/add-y-scale-ticks-formatter.ts'
import { parseRowHeader } from './helpers/parse-row-header.ts'
import { pipe } from './helpers/pipe.ts'

export function createBarChartConfig({
  data,
  format,
  softColors,
}: ChartOptions): ChartConfiguration | null {
  const parsed = parseRowHeader(data.rows)

  if (!parsed) {
    return null
  }

  const { header, activeRow } = parsed
  const labels = header.slice(1)
  const color = getChartColor({ index: 0, softColors, opacity: 0.85 })

  const datasets = [
    {
      label: activeRow[0] ?? '',
      data: activeRow.slice(1).map(Number),
      backgroundColor: color,
      borderColor: color,
    },
  ] satisfies ChartDataset<'bar'>[]

  return pipe(
    defaultConfig({ type: 'bar', datasets, labels }),
    addPlugins([chartDataLabelsPlugin]),
    addChartPadding({ top: 8, right: 16, left: 16 }),
    addXScaleGrid(false),
    addXScaleBorder(false),
    addYScaleBorder(false),
    addYScaleTicksFormatter(formatter(format, true)),
    addTooltip({
      callbacks: {
        label: (ctx) =>
          formatTooltipLabel.yAxis(format, ctx.dataset.label, ctx.parsed),
      },
    }),
    addLegend(false),
    addDataLabels({
      formatter: (value: string | number) => formatter(format, true)(value),
      color: '#fff',
      font: {
        family: INTER_FONT_FAMILY,
      },
    }),
  )
}
