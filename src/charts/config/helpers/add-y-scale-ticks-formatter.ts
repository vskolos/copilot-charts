import type { ChartConfiguration } from 'chart.js'

import { Y_AXIS_KEY } from '#/constants/config-keys.ts'

export function addYScaleTicksFormatter(
  formatValue: (val: string | number) => string,
) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      scales: {
        ...config.options?.scales,
        [Y_AXIS_KEY]: {
          ...config.options?.scales?.[Y_AXIS_KEY],
          ticks: {
            ...config.options?.scales?.[Y_AXIS_KEY]?.ticks,
            callback: formatValue,
          },
        },
      },
    },
  })
}
