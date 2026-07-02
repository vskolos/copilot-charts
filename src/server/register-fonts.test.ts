import Chart from 'chart.js/auto'
import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import { before, describe, test } from 'node:test'
import { Canvas, FontLibrary } from 'skia-canvas'

import { INTER_FONT_FAMILY } from '#/constants/export.ts'

import { interFontPaths, registerFonts } from './register-fonts.ts'

before(() => {
  registerFonts()
})

void describe('registerFonts', () => {
  void test('loads Inter and sets Chart.js default font', () => {
    assert.strictEqual(FontLibrary.has('Inter'), true)
    assert.strictEqual(Chart.defaults.font.family, INTER_FONT_FAMILY)
  })

  void test('loads vendored Inter font files with cyrillic coverage', async () => {
    const paths = interFontPaths()

    assert.ok(paths[0]?.includes('src/assets/fonts/Inter-Regular.woff2'))
    assert.ok(paths[1]?.includes('src/assets/fonts/Inter-SemiBold.woff2'))
    assert.ok(paths[2]?.includes('src/assets/fonts/Inter-Bold.woff2'))

    await Promise.all(paths.map(async (path) => access(path)))
  })

  void test('renders cyrillic month labels with Inter', () => {
    const ctx = new Canvas(120, 24).getContext('2d')
    const sample = 'янв фев мар'

    ctx.font = `12px ${INTER_FONT_FAMILY}`
    const interWidth = ctx.measureText(sample).width

    ctx.font = '12px sans-serif'
    const fallbackWidth = ctx.measureText(sample).width

    assert.notStrictEqual(interWidth, fallbackWidth)
  })

  void test('uses Inter for axis and data-label font strings', () => {
    const ctx = new Canvas(10, 10).getContext('2d')
    const sample = 'Ag0123'

    ctx.font = `12px ${INTER_FONT_FAMILY}`
    const interWidth = ctx.measureText(sample).width

    ctx.font = "12px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    const helveticaWidth = ctx.measureText(sample).width

    assert.notStrictEqual(interWidth, helveticaWidth)
    assert.ok(Math.abs(interWidth - helveticaWidth) > 0.5)
  })
})
