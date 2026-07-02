import type { ChartConfiguration, Plugin } from 'chart.js'

export function addPlugins(plugins: Plugin[]) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    plugins,
  })
}
