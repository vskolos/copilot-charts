import type { ChartConfiguration } from 'chart.js'

import { X_AXIS_KEY, Y_AXIS_KEY } from '#/constants/config-keys.ts'

export function addStacked<TConfig extends ChartConfiguration>(
  config: TConfig,
): TConfig {
  return {
    ...config,
    options: {
      ...config.options,
      scales: {
        ...config.options?.scales,
        [X_AXIS_KEY]: {
          ...config.options?.scales?.[X_AXIS_KEY],
          stacked: true,
        },
        [Y_AXIS_KEY]: {
          ...config.options?.scales?.[Y_AXIS_KEY],
          stacked: true,
        },
      },
    },
  }
}
