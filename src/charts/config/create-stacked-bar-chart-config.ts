import type { ChartConfiguration, ChartDataset } from 'chart.js'
import type { Context } from 'chartjs-plugin-datalabels'

import type { ChartOptions } from '#/types.ts'

import { formatTooltipLabel } from '#/charts/format-tooltip-label.ts'
import { getChartColor } from '#/charts/get-chart-color.ts'
import { chartDataLabelsPlugin } from '#/charts/plugins/chart-data-labels-plugin.ts'
import { totalizerPlugin } from '#/charts/plugins/totalizer-plugin.ts'
import { INTER_FONT_FAMILY } from '#/constants/export.ts'
import { formatter } from '#/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addChartPadding } from './helpers/add-chart-padding.ts'
import { addDataLabels } from './helpers/add-data-labels.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addPlugins } from './helpers/add-plugins.ts'
import { addStacked } from './helpers/add-stacked.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { addXScaleBorder } from './helpers/add-x-scale-border.ts'
import { addXScaleGrid } from './helpers/add-x-scale-grid.ts'
import { addYScaleBorder } from './helpers/add-y-scale-border.ts'
import { addYScaleTicksFormatter } from './helpers/add-y-scale-ticks-formatter.ts'
import { colLabels } from './helpers/col-labels.ts'
import { pipe } from './helpers/pipe.ts'

export function createStackedBarChartConfig({
  softColors,
  data,
  format,
  labelThreshold = 0.05,
}: ChartOptions): ChartConfiguration | null {
  const { cols } = data

  if (cols.length === 0) {
    return null
  }

  const labels = colLabels(cols)

  const datasets = cols.slice(1).map((col, colIndex) => {
    const label = col[0] ?? ''
    const values = col.slice(1).map(Number)
    const color = getChartColor({
      index: colIndex,
      softColors,
      opacity: 0.85,
    })

    return {
      label,
      data: values,
      backgroundColor: color,
      borderColor: color,
      barPercentage: 0.75,
    }
  }) satisfies ChartDataset<'bar'>[]

  if (datasets.length > 0) {
    datasets.push({
      label: '',
      data: Array.from({ length: labels.length }, () => 0),
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      barPercentage: 0.75,
    } satisfies ChartDataset<'bar'>)
  }

  return pipe(
    defaultConfig({ type: 'bar', datasets, labels }),
    addPlugins([chartDataLabelsPlugin, totalizerPlugin]),
    addChartPadding({ top: 20, right: 16, left: 16 }),
    addStacked,
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
      font: (ctx: Context) => {
        const totalizer = totalizerPlugin.getState(ctx.chart)

        return totalizer?.utmost === ctx.datasetIndex
          ? { family: INTER_FONT_FAMILY, weight: 600 }
          : { family: INTER_FONT_FAMILY, size: 11 }
      },
      align: (ctx: Context) => {
        const totalizer = totalizerPlugin.getState(ctx.chart)
        return totalizer?.utmost === ctx.datasetIndex ? 'top' : 'center'
      },
      offset: 0,
      color: (ctx: Context) => {
        const totalizer = totalizerPlugin.getState(ctx.chart)
        return totalizer?.utmost === ctx.datasetIndex ? '#000' : '#fff'
      },
      display: (ctx: Context) => {
        const totalizer = totalizerPlugin.getState(ctx.chart)

        if (totalizer?.utmost === ctx.datasetIndex) {
          return true
        }

        const total = totalizer?.totals[ctx.dataIndex] ?? 0
        const current = Number(ctx.dataset.data[ctx.dataIndex])

        return total * labelThreshold < current
      },
      formatter: (value: string | number, ctx) => {
        const totalizer = totalizerPlugin.getState(ctx.chart)
        if (!totalizer) {
          return formatter(format, true)(value)
        }
        if (totalizer.utmost === ctx.datasetIndex) {
          return formatter(format, true)(totalizer.totals[ctx.dataIndex] ?? 0)
        }
        return formatter(format, true)(value)
      },
    }),
  )
}
