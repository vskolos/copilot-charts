import { describe, expect, test } from 'bun:test'

import type { EntryData } from '@/schemas/entry-data-schema.ts'

import { chartImageRequestSchema } from '@/schemas/chart-image-request-schema.ts'

const rowEntryData: EntryData = {
  'Week 1': { 'Cat A': 100, 'Cat B': 200, 'Cat C': 150 },
}

describe('chartImageRequestSchema', () => {
  test('accepts valid request', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      softColors: false,
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.type).toBe('bar')
    }
  })

  test('accepts request without softColors', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.softColors).toBeUndefined()
    }
  })

  test('accepts request with title', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      title: 'Weekly revenue',
    })

    expect(result.success).toBe(true)

    if (result.success) {
      expect(result.data.title).toBe('Weekly revenue')
    }
  })

  test('rejects non-string title', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      title: 42,
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['title'])
    }
  })

  test('rejects unknown type', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'pie',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      softColors: false,
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['type'])
    }
  })

  test('rejects null data', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: null,
      width: 400,
      height: 300,
      format: 'unit',
      softColors: false,
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['data'])
    }
  })
})
