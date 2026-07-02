import { beforeAll, describe, expect, test } from 'bun:test'
import { Canvas } from 'skia-canvas'

import { DEVICE_PIXEL_RATIO } from '@/constants/export.ts'
import { getInterFontCss } from '@/utils/get-inter-font-css.ts'

import { asChartJsCanvas } from './as-chart-js-canvas.ts'
import { registerFonts } from './register-fonts.ts'

const TOTAL_LABEL = '12\u00A0111\u00A0110'

function countDarkPixels(
  data: Uint8ClampedArray,
  width: number,
  bounds: { x0: number; y0: number; x1: number; y1: number },
) {
  let count = 0

  for (let j = bounds.y0; j < bounds.y1; j += 1) {
    for (let i = bounds.x0; i < bounds.x1; i += 1) {
      const index = (j * width + i) * 4

      const red = data[index] ?? 255
      const green = data[index + 1] ?? 255
      const blue = data[index + 2] ?? 255

      if (red < 40 && green < 40 && blue < 40) {
        count += 1
      }
    }
  }

  return count
}

beforeAll(() => {
  registerFonts()
})

describe('asChartJsCanvas', () => {
  test('ignores fillText maxWidth that would clip the last glyph', () => {
    const canvas = new Canvas(160, 48)
    asChartJsCanvas(canvas)

    const ctx = canvas.getContext('2d')

    ctx.setTransform(DEVICE_PIXEL_RATIO, 0, 0, DEVICE_PIXEL_RATIO, 0, 0)
    ctx.font = getInterFontCss(12, 600)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, 80, 24)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, 80, 24)

    const clippedWidth = Math.round(ctx.measureText(TOTAL_LABEL).width)

    ctx.fillStyle = '#000'
    ctx.fillText(TOTAL_LABEL, 4, 12, clippedWidth)

    const { data, width } = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const rightEdge = countDarkPixels(data, width, {
      x0: 100,
      y0: 0,
      x1: 130,
      y1: canvas.height,
    })

    const leftEdge = countDarkPixels(data, width, {
      x0: 20,
      y0: 0,
      x1: 50,
      y1: canvas.height,
    })

    expect(rightEdge).toBeGreaterThan(10)
    expect(leftEdge).toBeGreaterThan(10)
  })
})
