import type { ChartConfiguration } from 'chart.js'

export function addLegend(display: boolean) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      plugins: {
        ...config.options?.plugins,
        legend: {
          display,
        },
      },
    },
  })
}
