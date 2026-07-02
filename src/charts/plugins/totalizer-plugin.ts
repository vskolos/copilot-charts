import type { Chart, Plugin } from 'chart.js'

type TotalizerState = {
  totals: Record<string, number>
  utmost: number
}

type TotalizerPlugin = Plugin & {
  getState: (chart: Chart) => TotalizerState | undefined
}

const totalizerStateMap = new WeakMap<Chart, TotalizerState>()

export const totalizerPlugin: TotalizerPlugin = {
  id: 'totalizer',

  getState(chart) {
    return totalizerStateMap.get(chart)
  },

  beforeUpdate(chart) {
    const totals: Record<string, number> = {}
    let utmost = 0

    for (const [datasetIndex, dataset] of chart.data.datasets.entries()) {
      if (chart.isDatasetVisible(datasetIndex)) {
        utmost = datasetIndex
        for (const [index, value] of dataset.data.entries()) {
          totals[index] = (totals[index] ?? 0) + Number(value)
        }
      }
    }

    totalizerStateMap.set(chart, { totals, utmost })
  },
}
