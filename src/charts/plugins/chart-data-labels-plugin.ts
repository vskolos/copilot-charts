import type { Plugin } from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

function isPlugin(value: unknown): value is Plugin {
  return typeof value === 'object' && value !== null && 'id' in value
}

if (!isPlugin(ChartDataLabels)) {
  throw new Error('chartjs-plugin-datalabels is not a valid Chart.js plugin')
}

export const chartDataLabelsPlugin: Plugin = ChartDataLabels
