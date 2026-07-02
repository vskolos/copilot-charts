import type { CanvasRenderingContext2D } from 'skia-canvas'

import { Canvas } from 'skia-canvas'

import { getInterFontCss } from '#/utils/get-inter-font-css.ts'

const TITLE_FONT_SIZE = 16
const TITLE_LINE_HEIGHT = 22
const TITLE_PADDING_BOTTOM = 8

type TitleMetrics = {
  fontSize: number
  lineHeight: number
  paddingBottom: number
}

export function titleMetrics(pixelRatio: number): TitleMetrics {
  return {
    fontSize: TITLE_FONT_SIZE * pixelRatio,
    lineHeight: TITLE_LINE_HEIGHT * pixelRatio,
    paddingBottom: TITLE_PADDING_BOTTOM * pixelRatio,
  }
}

function wrapTitleLines({
  ctx,
  title,
  maxWidth,
}: {
  ctx: CanvasRenderingContext2D
  title: string
  maxWidth: number
}): string[] {
  const words = title.split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return []
  }

  const lines: string[] = []

  let currentLine = words[0] ?? ''

  for (const word of words.slice(1)) {
    const nextLine = `${currentLine} ${word}`
    if (ctx.measureText(nextLine).width <= maxWidth) {
      currentLine = nextLine
      continue
    }

    lines.push(currentLine)
    currentLine = word
  }

  lines.push(currentLine)
  return lines
}

export function measureTitleLayout({
  ctx,
  title,
  maxWidth,
  metrics,
}: {
  ctx: CanvasRenderingContext2D
  title: string
  maxWidth: number
  metrics: TitleMetrics
}) {
  ctx.font = getInterFontCss(metrics.fontSize, 700)
  const lines = wrapTitleLines({ ctx, title, maxWidth })

  if (lines.length === 0) {
    return { lines, height: 0 }
  }

  return {
    lines,
    height: lines.length * metrics.lineHeight + metrics.paddingBottom,
  }
}

export function measureTitleHeight(title: string, width: number): number {
  const ctx = new Canvas(1, 1).getContext('2d')

  return measureTitleLayout({
    ctx,
    title,
    maxWidth: width,
    metrics: titleMetrics(1),
  }).height
}
