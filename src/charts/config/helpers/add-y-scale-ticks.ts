import type { ChartConfiguration } from 'chart.js'

import { Y_AXIS_KEY } from '#/constants/config-keys.ts'

export function addYScaleTicks(sampleSize: number, autoSkip: boolean) {
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
            // @ts-expect-error sampleSize is a cartesian tick option, absent from the radial tick union in ChartConfiguration
            sampleSize,
            autoSkip,
          },
        },
      },
    },
  })
}
