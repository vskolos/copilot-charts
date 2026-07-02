import { describe, expect, test } from 'bun:test'

import { formatter } from './formatter.ts'

describe('formatter', () => {
  test('formats percent with sign', () => {
    expect(formatter('percent', true)(75)).toBe('75%')
    expect(formatter('percent', true)(100)).toBe('100%')
  })

  test('formats money with large-number suffixes', () => {
    expect(formatter('money', true)(3_000_000_000)).toBe('3 млрд')
    expect(formatter('money', true)(3_000_000)).toBe('3 млн')
  })

  test('formats money without suffixes when alternative is false', () => {
    expect(formatter('money', false)(3_000_000_000)).toBe(
      '3\u00A0000\u00A0000\u00A0000',
    )
  })

  test('formats time as hh:mm:ss', () => {
    expect(formatter('time')(3661)).toBe('1:01:01')
  })

  test('passes through non-numeric strings', () => {
    expect(formatter('unit')('N/A')).toBe('N/A')
  })
})
