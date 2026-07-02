import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartOptions } from '@/types.ts'

import { formatTooltipLabel } from '@/charts/format-tooltip-label.ts'
import { formatter } from '@/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addLineElement } from './helpers/add-line-element.ts'
import { addRScaleTicksFormatter } from './helpers/add-r-scale-ticks-formatter.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { parseRowHeader } from './helpers/parse-row-header.ts'
import { pipe } from './helpers/pipe.ts'

export function createRadarChartConfig({
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
  const labels = header.slice(1).toReversed()
  const values = activeRow.slice(1).map(Number).toReversed()

  const datasets = [
    {
      data: values,
      backgroundColor: '#008ffb33',
      borderColor: '#008ffb',
    },
  ] satisfies ChartDataset<'radar'>[]

  return pipe(
    defaultConfig({ type: 'radar', datasets, labels }),
    addRScaleTicksFormatter(formatter(format, true)),
    addLineElement(2),
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
