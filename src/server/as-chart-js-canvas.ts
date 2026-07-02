import type { Canvas } from 'skia-canvas'

import { patchTextRendering } from './patch-text-rendering.ts'

export function asChartJsCanvas(canvas: Canvas): HTMLCanvasElement {
  patchTextRendering(canvas.getContext('2d'))

  // Chart.js expects a DOM canvas; skia-canvas is API-compatible at runtime.
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return canvas as unknown as HTMLCanvasElement
}
