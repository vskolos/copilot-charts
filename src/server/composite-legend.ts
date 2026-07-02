import type { Chart } from 'chart.js'
import type { CanvasRenderingContext2D } from 'skia-canvas'

import { Canvas } from 'skia-canvas'

import { getInterFontCss } from '@/utils/get-inter-font-css.ts'

const LEGEND_ROW_HEIGHT = 24
const LEGEND_PADDING = 12
const LEGEND_GAP = 8
const BOX_SIZE = 12
const BOX_RADIUS = 2
const TEXT_GAP = 4
const FONT_SIZE = 13

type LegendMetrics = {
  rowHeight: number
  padding: number
  gap: number
  boxSize: number
  boxRadius: number
  textGap: number
  fontSize: number
}

function legendMetrics(pixelRatio: number): LegendMetrics {
  return {
    rowHeight: LEGEND_ROW_HEIGHT * pixelRatio,
    padding: LEGEND_PADDING * pixelRatio,
    gap: LEGEND_GAP * pixelRatio,
    boxSize: BOX_SIZE * pixelRatio,
    boxRadius: BOX_RADIUS * pixelRatio,
    textGap: TEXT_GAP * pixelRatio,
    fontSize: FONT_SIZE * pixelRatio,
  }
}

type LegendItem = {
  text: string
  fillStyle: string
  strokeStyle: string
  lineWidth: number
  hidden: boolean
  chartType: string
}

function getChartType(chart: Chart): string {
  if ('type' in chart.config && typeof chart.config.type === 'string') {
    return chart.config.type
  }
  return 'bar'
}

function legendColor(value: unknown): string {
  return typeof value === 'string' ? value : '#000000'
}

function getLegendItems(chart: Chart): LegendItem[] {
  const generateLabels = chart.options.plugins?.legend?.labels?.generateLabels

  if (!generateLabels) {
    return []
  }

  return generateLabels(chart)
    .filter((item) => item.fillStyle !== 'transparent')
    .map((item) => ({
      text: item.text,
      fillStyle: legendColor(item.fillStyle),
      strokeStyle: legendColor(item.strokeStyle),
      lineWidth: item.lineWidth ?? 0,
      hidden: Boolean(item.hidden),
      chartType: getChartType(chart),
    }))
}

function measureLegendLayout({
  ctx,
  items,
  maxWidth,
  metrics,
}: {
  ctx: CanvasRenderingContext2D
  items: LegendItem[]
  maxWidth: number
  metrics: LegendMetrics
}) {
  ctx.font = getInterFontCss(metrics.fontSize)

  const rows: LegendItem[][] = [[]]
  let currentRowWidth = 0

  for (const item of items) {
    const textWidth = ctx.measureText(item.text).width
    const itemWidth =
      metrics.boxSize + metrics.textGap + textWidth + metrics.gap

    if (currentRowWidth + itemWidth > maxWidth && rows.at(-1)?.length) {
      rows.push([])
      currentRowWidth = 0
    }

    rows.at(-1)?.push(item)
    currentRowWidth += itemWidth
  }

  return {
    rows,
    height: rows.length * metrics.rowHeight + metrics.padding,
  }
}

function drawLegend({
  ctx,
  items,
  canvasWidth,
  chartHeight,
  metrics,
}: {
  ctx: CanvasRenderingContext2D
  items: LegendItem[]
  canvasWidth: number
  chartHeight: number
  metrics: LegendMetrics
}) {
  const layout = measureLegendLayout({
    ctx,
    items,
    maxWidth: canvasWidth - metrics.padding * 2,
    metrics,
  })
  let yCoord = chartHeight + metrics.padding

  for (const row of layout.rows) {
    const rowWidths = row.map((item) => {
      const textWidth = ctx.measureText(item.text).width
      return metrics.boxSize + metrics.textGap + textWidth + metrics.gap
    })
    let rowWidth = 0
    for (const width of rowWidths) {
      rowWidth += width
    }
    rowWidth -= metrics.gap
    let xCoord = (canvasWidth - rowWidth) / 2

    for (const item of row) {
      const textWidth = ctx.measureText(item.text).width
      const opacity = item.hidden ? 0.25 : 1

      ctx.save()
      ctx.globalAlpha = opacity

      const boxY = yCoord + (metrics.rowHeight - metrics.boxSize) / 2

      ctx.fillStyle =
        item.chartType === 'line' ? item.strokeStyle : item.fillStyle
      ctx.strokeStyle = item.strokeStyle
      ctx.lineWidth = (item.lineWidth * metrics.fontSize) / FONT_SIZE
      ctx.beginPath()
      ctx.roundRect(
        xCoord,
        boxY,
        metrics.boxSize,
        metrics.boxSize,
        metrics.boxRadius,
      )
      ctx.fill()
      if (item.lineWidth > 0) {
        ctx.stroke()
      }

      ctx.fillStyle = '#111'
      ctx.textBaseline = 'middle'
      ctx.fillText(
        item.text,
        xCoord + metrics.boxSize + metrics.textGap,
        yCoord + metrics.rowHeight / 2,
      )
      ctx.restore()

      xCoord += metrics.boxSize + metrics.textGap + textWidth + metrics.gap
    }

    yCoord += metrics.rowHeight
  }

  return layout.height
}

export async function compositeLegend({
  chartCanvas,
  chart,
  withLegend,
  pixelRatio = 1,
}: {
  chartCanvas: Canvas
  chart: Chart
  withLegend: boolean
  pixelRatio?: number
}): Promise<Canvas> {
  if (!withLegend) {
    return chartCanvas
  }

  const items = getLegendItems(chart)

  if (items.length === 0) {
    return chartCanvas
  }

  const metrics = legendMetrics(pixelRatio)
  const chartCtx = chartCanvas.getContext('2d')

  const layout = measureLegendLayout({
    ctx: chartCtx,
    items,
    maxWidth: chartCanvas.width,
    metrics,
  })

  const finalCanvas = new Canvas(
    chartCanvas.width,
    chartCanvas.height + layout.height,
  )

  const ctx = finalCanvas.getContext('2d')

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)

  const chartImage = await chartCanvas.toBuffer('png')
  const image = await loadImage(chartImage)
  ctx.drawImage(image, 0, 0)

  drawLegend({
    ctx,
    items,
    canvasWidth: finalCanvas.width,
    chartHeight: chartCanvas.height,
    metrics,
  })

  return finalCanvas
}

async function loadImage(buffer: Buffer) {
  const { loadImage: decodeImage } = await import('skia-canvas')
  return decodeImage(buffer)
}
