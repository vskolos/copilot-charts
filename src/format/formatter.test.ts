import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { formatter } from './formatter.ts'

void describe('formatter', () => {
  void test('formats percent with sign', () => {
    assert.strictEqual(formatter('percent', true)(75), '75%')
    assert.strictEqual(formatter('percent', true)(100), '100%')
  })

  void test('formats money with large-number suffixes', () => {
    assert.strictEqual(formatter('money', true)(3_000_000_000), '3 млрд')
    assert.strictEqual(formatter('money', true)(3_000_000), '3 млн')
  })

  void test('formats money without suffixes when alternative is false', () => {
    assert.strictEqual(
      formatter('money', false)(3_000_000_000),
      '3\u00A0000\u00A0000\u00A0000',
    )
  })

  void test('formats time as hh:mm:ss', () => {
    assert.strictEqual(formatter('time')(3661), '1:01:01')
  })

  void test('passes through non-numeric strings', () => {
    assert.strictEqual(formatter('unit')('N/A'), 'N/A')
  })
})
