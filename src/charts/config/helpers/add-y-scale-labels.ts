import type { ChartConfiguration } from 'chart.js'

import { Y_AXIS_KEY } from '#/constants/config-keys.ts'

export function addYScaleLabels(labels: string[], offset?: boolean) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      scales: {
        ...config.options?.scales,
        [Y_AXIS_KEY]: {
          ...config.options?.scales?.[Y_AXIS_KEY],
          type: 'category',
          labels,
          offset,
        },
      },
    },
  })
}
