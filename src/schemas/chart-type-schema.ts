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
    'bubble',
    'polar area',
  ],
  { message: 'invalid chart type' },
)

export type ChartType = z.infer<typeof ChartType>
