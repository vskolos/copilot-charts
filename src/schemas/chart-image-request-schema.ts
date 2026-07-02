import { z } from 'zod'

import { ChartType } from '#/schemas/chart-type-schema.ts'
import { DataFormat } from '#/schemas/data-format-schema.ts'

import { entryDataSchema } from './entry-data-schema.ts'

export const chartImageRequestSchema = z.object({
  type: ChartType,
  format: DataFormat,
  width: z
    .number('width must be a positive number')
    .positive('width must be positive'),
  height: z
    .number('height must be a positive number')
    .positive('height must be positive'),
  softColors: z.boolean().optional(),
  labelThreshold: z
    .number('labelThreshold must be a number between 0 and 1')
    .min(0, 'labelThreshold must be between 0 and 1')
    .max(1, 'labelThreshold must be between 0 and 1')
    .optional(),
  title: z.string('title must be a string or omitted').optional(),
  data: entryDataSchema,
})

export type ChartImageRequest = z.infer<typeof chartImageRequestSchema>
