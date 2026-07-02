import type { CanvasRenderingContext2D } from 'skia-canvas'

const patchedContexts = new WeakSet<CanvasRenderingContext2D>()

export function patchTextRendering(ctx: CanvasRenderingContext2D) {
  if (patchedContexts.has(ctx)) {
    return
  }

  // chartjs-plugin-datalabels passes fillText a maxWidth that is rounded down via
  // rasterize. skia-canvas clips the last glyph when maxWidth is below measureText.
  const fillText = ctx.fillText.bind(ctx)
  const strokeText = ctx.strokeText.bind(ctx)

  type TextFn = CanvasRenderingContext2D['fillText']

  ctx.fillText = ((original: TextFn) => (text, xCoord, yCoord) => {
    original(text, xCoord, yCoord)
  })(fillText)

  ctx.strokeText = ((original: TextFn) => (text, xCoord, yCoord) => {
    original(text, xCoord, yCoord)
  })(strokeText)

  patchedContexts.add(ctx)
}
