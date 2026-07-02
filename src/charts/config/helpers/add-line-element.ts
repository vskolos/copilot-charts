import type { ChartConfiguration } from 'chart.js'

export function addLineElement(borderWidth: number, tension?: number) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      elements: {
        ...config.options?.elements,
        line: {
          ...config.options?.elements?.line,
          borderWidth,
          tension,
        },
      },
    },
  })
}
