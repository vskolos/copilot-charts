import { z } from 'zod'

export const ChartType = z.enum(
  [
    'area',
    'bar',
    'stacked bar',
    'line',
    'heatmap',
    'donut',
    'radar',
    'treemap',
  ],
  { message: 'invalid chart type' },
)

export type ChartType = z.infer<typeof ChartType>
