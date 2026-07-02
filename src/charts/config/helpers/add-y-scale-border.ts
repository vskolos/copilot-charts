import type { ChartConfiguration } from 'chart.js'

import { Y_AXIS_KEY } from '#/constants/config-keys.ts'

export function addYScaleBorder(display: boolean) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      scales: {
        ...config.options?.scales,
        [Y_AXIS_KEY]: {
          ...config.options?.scales?.[Y_AXIS_KEY],
          border: {
            display,
          },
        },
      },
    },
  })
}
