import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '@/types.ts'

import { formatTooltipLabel } from '@/charts/format-tooltip-label.ts'
import { getChartColor } from '@/charts/get-chart-color.ts'
import { CHART_STROKE_WIDTH } from '@/constants/chart-style.ts'

import { defaultConfig } from './default-config.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { pipe } from './helpers/pipe.ts'

export function createPolarAreaChartConfig({
  data,
  format,
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

  const borderColors = rowValues.map((_, index) => getChartColor({ index }))

  const fillColors = rowValues.map((_, index) =>
    getChartColor({ index, opacity: 0.3 }),
  )

  const datasets = [
    {
      data: rowValues,
      backgroundColor: fillColors,
      borderColor: borderColors,
      borderWidth: CHART_STROKE_WIDTH,
    },
  ] satisfies ChartDataset<'polarArea'>[]

  return pipe(
    defaultConfig({ type: 'polarArea', datasets, labels }),
    addTooltip({
      bodySpacing: 8,
      callbacks: {
        label: (ctx) =>
          formatTooltipLabel.radial(format, ctx.label, ctx.parsed),
      },
    }),
    addLegend(false),
  )
}
