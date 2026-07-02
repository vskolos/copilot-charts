import type { Chart } from 'chart.js'
import type { CanvasRenderingContext2D } from 'skia-canvas'

import { Canvas } from 'skia-canvas'

import { getInterFontCss } from '@/utils/get-inter-font-css.ts'

const LEGEND_ROW_HEIGHT = 24
const LEGEND_PADDING = 12
const LEGEND_GAP = 8
const BOX_SIZE = 12
const TEXT_GAP = 4
const FONT_SIZE = 13

type LegendMetrics = {
  rowHeight: number
  padding: number
  gap: number
  boxSize: number
  textGap: number
  fontSize: number
}

type LegendItem = {
  text: string
  fillStyle: string
  strokeStyle: string
  lineWidth: number
  hidden: boolean
  chartType: string
}

function legendMetrics(pixelRatio: number): LegendMetrics {
  return {
    rowHeight: LEGEND_ROW_HEIGHT * pixelRatio,
    padding: LEGEND_PADDING * pixelRatio,
    gap: LEGEND_GAP * pixelRatio,
    boxSize: BOX_SIZE * pixelRatio,
    textGap: TEXT_GAP * pixelRatio,
    fontSize: FONT_SIZE * pixelRatio,
  }
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

export function measureLegendHeight(chart: Chart, width: number): number {
  const items = getLegendItems(chart)

  if (items.length === 0) {
    return 0
  }

  const ctx = new Canvas(1, 1).getContext('2d')
  return measureLegendLayout({
    ctx,
    items,
    maxWidth: width,
    metrics: legendMetrics(1),
  }).height
}
