import type { ChartConfiguration } from 'chart.js'

import type { X_AXIS_KEY, Y_AXIS_KEY } from '@/constants/config-keys.ts'

type Point = {
  [X_AXIS_KEY]: number
  [Y_AXIS_KEY]: number
}

type TRBL = {
  top: number
  right: number
  bottom: number
  left: number
}

type Padding = Partial<TRBL> | number | Point

export function addChartPadding(padding: Padding) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      layout: {
        ...config.options?.layout,
        padding,
      },
    },
  })
}
