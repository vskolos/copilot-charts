import type { ChartConfiguration } from 'chart.js'

import { R_AXIS_KEY } from '#/constants/config-keys.ts'

export function addRScaleTicksFormatter(
  formatValue: (val: string | number) => string,
) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      scales: {
        ...config.options?.scales,
        [R_AXIS_KEY]: {
          ...config.options?.scales?.[R_AXIS_KEY],
          ticks: {
            ...config.options?.scales?.[R_AXIS_KEY]?.ticks,
            callback: formatValue,
          },
        },
      },
    },
  })
}
