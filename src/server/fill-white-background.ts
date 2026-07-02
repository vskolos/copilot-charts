import type { Canvas } from 'skia-canvas'

export function fillWhiteBackground(canvas: Canvas) {
  const ctx = canvas.getContext('2d')

  ctx.save()
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.restore()
}
