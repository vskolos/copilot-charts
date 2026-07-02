import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import type { EntryData } from '#/schemas/entry-data-schema.ts'

import { chartImageRequestSchema } from '#/schemas/chart-image-request-schema.ts'

const rowEntryData: EntryData = {
  'Week 1': { 'Cat A': 100, 'Cat B': 200, 'Cat C': 150 },
}

void describe('chartImageRequestSchema', () => {
  void test('accepts valid request', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      softColors: false,
    })

    assert.strictEqual(result.success, true)
    assert.strictEqual(result.data.type, 'bar')
  })

  void test('accepts request without softColors', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
    })

    assert.strictEqual(result.success, true)
    assert.strictEqual(result.data.softColors, undefined)
  })

  void test('accepts request with title', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      title: 'Weekly revenue',
    })

    assert.strictEqual(result.success, true)
    assert.strictEqual(result.data.title, 'Weekly revenue')
  })

  void test('rejects non-string title', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      title: 42,
    })

    assert.strictEqual(result.success, false)
    assert.deepStrictEqual(result.error.issues[0]?.path, ['title'])
  })

  void test('rejects unknown type', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'pie',
      data: rowEntryData,
      width: 400,
      height: 300,
      format: 'unit',
      softColors: false,
    })

    assert.strictEqual(result.success, false)
    assert.deepStrictEqual(result.error.issues[0]?.path, ['type'])
  })

  void test('rejects null data', () => {
    const result = chartImageRequestSchema.safeParse({
      type: 'bar',
      data: null,
      width: 400,
      height: 300,
      format: 'unit',
      softColors: false,
    })

    assert.strictEqual(result.success, false)
    assert.deepStrictEqual(result.error.issues[0]?.path, ['data'])
  })
})
