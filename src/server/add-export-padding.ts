import type { Canvas } from 'skia-canvas'

import { Canvas as SkiaCanvas } from 'skia-canvas'

export async function addExportPadding({
  canvas,
  outputWidth,
  outputHeight,
  padding,
}: {
  canvas: Canvas
  outputWidth: number
  outputHeight: number
  padding: number
}): Promise<Canvas> {
  const exportCanvas = new SkiaCanvas(outputWidth, outputHeight)
  const ctx = exportCanvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, outputWidth, outputHeight)

  const { loadImage } = await import('skia-canvas')
  const image = await loadImage(await canvas.toBuffer('png'))
  ctx.drawImage(image, padding, padding)

  return exportCanvas
}
