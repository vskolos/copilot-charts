import type { ChartConfiguration } from 'chart.js'

import { X_AXIS_KEY } from '@/constants/config-keys.ts'

export function addXScaleGrid(display: boolean) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      scales: {
        ...config.options?.scales,
        [X_AXIS_KEY]: {
          ...config.options?.scales?.[X_AXIS_KEY],
          grid: {
            ...config.options?.scales?.[X_AXIS_KEY]?.grid,
            display,
          },
        },
      },
    },
  })
}
