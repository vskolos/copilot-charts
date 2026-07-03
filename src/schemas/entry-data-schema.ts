import { z } from 'zod'

export const entryDataSchema = z
  .record(
    z.string(),
    z.record(z.string(), z.number('value must be a number'), {
      message: 'invalid entry data',
    }),
    { message: 'invalid entry data' },
  )
  .refine((data) => Object.keys(data).length > 0, 'data must not be empty')

export type EntryData = z.infer<typeof entryDataSchema>
