import type { ChartConfiguration, ChartDataset } from 'chart.js'
import type { MatrixDataPoint } from 'chartjs-chart-matrix'
import type { Context } from 'chartjs-plugin-datalabels'

import type { ChartOptions } from '#/types.ts'

import { chartDataLabelsPlugin } from '#/charts/plugins/chart-data-labels-plugin.ts'
import { VALUE_KEY, X_AXIS_KEY, Y_AXIS_KEY } from '#/constants/config-keys.ts'
import { INTER_FONT_FAMILY } from '#/constants/export.ts'
import { formatter } from '#/format/formatter.ts'

import { defaultConfig } from './default-config.ts'
import { addDataLabels } from './helpers/add-data-labels.ts'
import { addLegend } from './helpers/add-legend.ts'
import { addPlugins } from './helpers/add-plugins.ts'
import { addTooltip } from './helpers/add-tooltip.ts'
import { addXScaleGrid } from './helpers/add-x-scale-grid.ts'
import { addXScaleLabels } from './helpers/add-x-scale-labels.ts'
import { addYScaleGrid } from './helpers/add-y-scale-grid.ts'
import { addYScaleLabels } from './helpers/add-y-scale-labels.ts'
import { addYScaleTicks } from './helpers/add-y-scale-ticks.ts'
import { colLabels } from './helpers/col-labels.ts'
import { maxNumericValue } from './helpers/max-numeric-value.ts'
import { pipe } from './helpers/pipe.ts'

type MatrixPoint = {
  [X_AXIS_KEY]: string
  [Y_AXIS_KEY]: string
  [VALUE_KEY]: number
}

function asMatrixPoint(value: unknown): MatrixPoint {
  if (!isMatrixPoint(value)) {
    throw new Error('invalid matrix point')
  }

  return value
}

function isMatrixPoint(value: unknown): value is MatrixPoint {
  return (
    typeof value === 'object' &&
    value !== null &&
    X_AXIS_KEY in value &&
    Y_AXIS_KEY in value &&
    VALUE_KEY in value
  )
}

function matrixCellSize(
  chart: {
    chartArea?: { width: number; height: number }
    width: number
    height: number
  },
  labelCount: number,
) {
  const areaWidth = chart.chartArea?.width ?? chart.width
  const areaHeight = chart.chartArea?.height ?? chart.height

  return {
    width: areaWidth / labelCount - 1,
    height: areaHeight / labelCount - 1,
  }
}

export function createHeatMapChartConfig({
  data,
  format,
}: ChartOptions): ChartConfiguration | null {
  const { cols } = data

  if (cols.length === 0) {
    return null
  }

  const xLabels = colLabels(cols)

  if (xLabels.length === 0) {
    return null
  }

  const yLabels = cols.slice(1).map((col) => col[0] ?? '')

  const maxValue = maxNumericValue(cols.slice(1).flat())

  const datasets = [
    {
      data: cols.slice(1).flatMap((col, colIndex) =>
        col.slice(1).map((value, rowIndex) => ({
          [X_AXIS_KEY]: xLabels[rowIndex] ?? '',
          [Y_AXIS_KEY]: yLabels[colIndex] ?? '',
          [VALUE_KEY]: Number(value),
        })),
      ),
      backgroundColor: (ctx) => {
        const point = asMatrixPoint(ctx.dataset.data[ctx.dataIndex])
        const alpha = ((point[VALUE_KEY] / maxValue) * 100).toFixed(2)
        return `rgba(63, 81, 181, ${alpha}%)`
      },
      width: ({ chart }) => matrixCellSize(chart, xLabels.length).width,
      height: ({ chart }) => matrixCellSize(chart, yLabels.length).height,
    },
  ] satisfies ChartDataset<'matrix', MatrixDataPoint[]>[]

  return pipe(
    defaultConfig({
      type: 'matrix',
      datasets,
      labels: [],
    }),
    addPlugins([chartDataLabelsPlugin]),
    addXScaleLabels(xLabels),
    addXScaleGrid(false),
    addYScaleLabels(yLabels, true),
    addYScaleGrid(false),
    addYScaleTicks(yLabels.length, false),
    addTooltip({
      bodySpacing: 8,
      callbacks: {
        label: (ctx) => {
          const point = asMatrixPoint(ctx.dataset.data[ctx.dataIndex])
          return `${point.y}: ${formatter(format)(point[VALUE_KEY])}`
        },
      },
    }),
    addLegend(false),
    addDataLabels({
      font: { family: INTER_FONT_FAMILY },
      color: (ctx: Context) => {
        const point = asMatrixPoint(ctx.dataset.data[ctx.dataIndex])
        const alpha = (point[VALUE_KEY] / maxValue) * 100
        return alpha > 25 ? '#fff' : '#3F51B5'
      },
      display: true,
      formatter: (_, ctx: Context) => {
        const point = asMatrixPoint(ctx.dataset.data[ctx.dataIndex])
        return formatter(format, true)(point[VALUE_KEY])
      },
    }),
  )
}
