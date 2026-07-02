import type { ChartConfiguration } from 'chart.js'
import type { LabelOptions } from 'chartjs-plugin-datalabels/types/options'

export function addDataLabels(datalabels: Partial<LabelOptions>) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      plugins: {
        ...config.options?.plugins,
        datalabels,
      },
    },
  })
}
