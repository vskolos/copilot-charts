import type { ChartConfiguration } from 'chart.js'

export function addCutout(cutout: number | string) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      cutout,
    } as ChartConfiguration['options'],
  })
}
