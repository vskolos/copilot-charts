import type { Canvas } from 'skia-canvas'

import { Canvas as SkiaCanvas } from 'skia-canvas'

import { getInterFontCss } from '@/utils/get-inter-font-css.ts'

import { measureTitleLayout, titleMetrics } from './measure-title-height.ts'

export async function compositeTitle({
  chartCanvas,
  title,
  pixelRatio = 1,
}: {
  chartCanvas: Canvas
  title: string
  pixelRatio?: number
}): Promise<Canvas> {
  const metrics = titleMetrics(pixelRatio)
  const chartCtx = chartCanvas.getContext('2d')
  const layout = measureTitleLayout({
    ctx: chartCtx,
    title,
    maxWidth: chartCanvas.width,
    metrics,
  })

  if (layout.lines.length === 0) {
    return chartCanvas
  }

  const finalCanvas = new SkiaCanvas(
    chartCanvas.width,
    layout.height + chartCanvas.height,
  )

  const ctx = finalCanvas.getContext('2d')

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)

  ctx.font = getInterFontCss(metrics.fontSize, 700)
  ctx.fillStyle = '#111'
  ctx.textBaseline = 'middle'

  for (const [index, line] of layout.lines.entries()) {
    const lineWidth = ctx.measureText(line).width
    const xCoord = (finalCanvas.width - lineWidth) / 2
    const yCoord = metrics.lineHeight / 2 + index * metrics.lineHeight
    ctx.fillText(line, xCoord, yCoord)
  }

  const chartImage = await chartCanvas.toBuffer('png')
  const { loadImage } = await import('skia-canvas')
  const image = await loadImage(chartImage)
  ctx.drawImage(image, 0, layout.height)

  return finalCanvas
}
