import { z } from 'zod'

const entryValueSchema = z.union([z.string(), z.number(), z.null()], {
  message: 'invalid entry value',
})

export const entryDataSchema = z
  .record(
    z.string(),
    z.record(z.string(), entryValueSchema, { message: 'invalid entry data' }),
    { message: 'invalid entry data' },
  )
  .refine((data) => Object.keys(data).length > 0, 'data must not be empty')

export type EntryData = z.infer<typeof entryDataSchema>
