import type { ChartConfiguration, ChartDataset } from 'chart.js'

import type { ChartJsType } from '#/types.ts'

import { DEVICE_PIXEL_RATIO } from '#/constants/export.ts'

export function defaultConfig({
  type,
  datasets,
  labels,
}: {
  type: ChartJsType
  datasets: ChartDataset[]
  labels: string[]
}): ChartConfiguration {
  return {
    type,
    data: { datasets, labels },
    options: {
      maintainAspectRatio: false,
      animation: false,
      devicePixelRatio: DEVICE_PIXEL_RATIO,
    },
  }
}
