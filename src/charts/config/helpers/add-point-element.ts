import type { ChartConfiguration } from 'chart.js'

export function addPointElement(radius: number) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      elements: {
        ...config.options?.elements,
        point: {
          ...config.options?.elements?.point,
          radius,
        },
      },
    },
  })
}
