import type { ChartConfiguration, ChartDataset } from 'chart.js'
import type { Context } from 'chartjs-plugin-datalabels'

import ChartDataLabels from 'chartjs-plugin-datalabels'

import type { ChartOptions } from '@/types.ts'

import { formatTooltipLabel } from '@/charts/format-tooltip-label.ts'
import { getChartColor } from '@/charts/get-chart-color.ts'
import { INTER_FONT_FAMILY } from '@/constants/export.ts'
import { formatter } from '@/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addDataLabels } from './helpers/add-data-labels.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addPlugins } from './helpers/add-plugins.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { addXScaleBorder } from './helpers/add-x-scale-border.ts'
import { addXScaleGrid } from './helpers/add-x-scale-grid.ts'
import { addYScaleBorder } from './helpers/add-y-scale-border.ts'
import { addYScaleTicksFormatter } from './helpers/add-y-scale-ticks-formatter.ts'
import { pipe } from './helpers/pipe.ts'

export function createAreaChartConfig({
  data,
  format,
  softColors,
}: ChartOptions): ChartConfiguration | null {
  const { columnHeaders, rowHeaders, values } = data

  if (rowHeaders.length === 0) {
    return null
  }

  const labels = columnHeaders

  const datasets = rowHeaders.map((label, rowIndex) => ({
    label,
    data: values[rowIndex] ?? [],
    backgroundColor: getChartColor({
      index: rowIndex,
      softColors,
      opacity: 0.3,
    }),
    borderColor: getChartColor({ index: rowIndex, softColors }),
    fill: 'origin' as const,
  })) satisfies ChartDataset<'line'>[]

  return pipe(
    defaultConfig({ type: 'line', datasets, labels }),
    addPlugins([ChartDataLabels]),
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
    addDataLabels({
      formatter: (value: string | number) => formatter(format, true)(value),
      color: '#fff',
      backgroundColor: (ctx: Context) =>
        getChartColor({ index: ctx.datasetIndex, softColors, opacity: 0.85 }),
      borderColor: (ctx: Context) =>
        getChartColor({ index: ctx.datasetIndex, softColors }),
      borderRadius: 2,
      padding: 2,
      font: {
        family: INTER_FONT_FAMILY,
        lineHeight: 1,
      },
    }),
  )
}
