import { z } from 'zod'

export const DataFormat = z.enum(['money', 'unit', 'time', 'percent'], {
  message: 'invalid data format',
})

export type DataFormat = z.infer<typeof DataFormat>
