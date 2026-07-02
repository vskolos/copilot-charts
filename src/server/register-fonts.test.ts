import { beforeAll, describe, expect, test } from 'bun:test'
import Chart from 'chart.js/auto'
import { Canvas, FontLibrary } from 'skia-canvas'

import { INTER_FONT_FAMILY } from '@/constants/export.ts'

import { interFontPaths, registerFonts } from './register-fonts.ts'

beforeAll(() => {
  registerFonts()
})

describe('registerFonts', () => {
  test('loads Inter and sets Chart.js default font', () => {
    expect(FontLibrary.has('Inter')).toBe(true)
    expect(Chart.defaults.font.family).toBe(INTER_FONT_FAMILY)
  })

  test('loads vendored Inter font files with cyrillic coverage', async () => {
    expect(interFontPaths()).toEqual([
      expect.stringContaining('src/assets/fonts/Inter-Regular.woff2'),
      expect.stringContaining('src/assets/fonts/Inter-SemiBold.woff2'),
      expect.stringContaining('src/assets/fonts/Inter-Bold.woff2'),
    ] as const)

    expect(
      await Promise.all(
        interFontPaths().map(async (path) => await Bun.file(path).exists()),
      ),
    ).toEqual([true, true, true])
  })

  test('renders cyrillic month labels with Inter', () => {
    const ctx = new Canvas(120, 24).getContext('2d')
    const sample = 'янв фев мар'

    ctx.font = `12px ${INTER_FONT_FAMILY}`
    const interWidth = ctx.measureText(sample).width

    ctx.font = '12px sans-serif'
    const fallbackWidth = ctx.measureText(sample).width

    expect(interWidth).not.toBe(fallbackWidth)
  })

  test('uses Inter for axis and data-label font strings', () => {
    const ctx = new Canvas(10, 10).getContext('2d')
    const sample = 'Ag0123'

    ctx.font = `12px ${INTER_FONT_FAMILY}`
    const interWidth = ctx.measureText(sample).width

    ctx.font = "12px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    const helveticaWidth = ctx.measureText(sample).width

    expect(interWidth).not.toBe(helveticaWidth)
    expect(Math.abs(interWidth - helveticaWidth)).toBeGreaterThan(0.5)
  })
})
