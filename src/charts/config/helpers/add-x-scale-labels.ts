import type { ChartConfiguration } from 'chart.js'

import { X_AXIS_KEY } from '@/constants/config-keys.ts'

export function addXScaleLabels(labels: string[]) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      scales: {
        ...config.options?.scales,
        [X_AXIS_KEY]: {
          ...config.options?.scales?.[X_AXIS_KEY],
          type: 'category',
          labels,
        },
      },
    },
  })
}
