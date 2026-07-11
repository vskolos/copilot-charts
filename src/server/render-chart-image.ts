import Chart from 'chart.js/auto'
import { mkdir } from 'node:fs/promises'
import { Canvas } from 'skia-canvas'

import type { ChartImageRequest } from '@/schemas/chart-image-request-schema.ts'
import type { ChartType } from '@/schemas/chart-type-schema.ts'

import { createChartConfig } from '@/charts/config/create-chart-config.ts'
import { registerCharts } from '@/charts/register-charts.ts'
import {
  DEVICE_PIXEL_RATIO,
  EXPORT_PADDING,
  OUTPUT_DIR,
} from '@/constants/export.ts'
import { createTableData } from '@/format/create-table-data.ts'

import { addExportPadding } from './add-export-padding.ts'
import { asChartJsCanvas } from './as-chart-js-canvas.ts'
import { compositeLegend } from './composite-legend.ts'
import { compositeTitle } from './composite-title.ts'
import { fillWhiteBackground } from './fill-white-background.ts'
import { measureLegendHeight } from './measure-legend-height.ts'
import { measureTitleHeight } from './measure-title-height.ts'
import { registerFonts } from './register-fonts.ts'
import { UnprocessableDataError } from './unprocessable-data-error.ts'

registerCharts()
registerFonts()

const CHART_TYPES_WITH_LEGEND = new Set<ChartType>([
  'area',
  'bar',
  'stacked bar',
  'line',
  'donut',
  'radar',
  'polar area',
  'bubble',
])

export async function renderChartImage(
  request: ChartImageRequest,
): Promise<{ filename: string }> {
  const tableData = createTableData(request.data)
  const buildConfig = createChartConfig(request.type)

  const config = buildConfig({
    softColors: request.softColors ?? false,
    data: tableData,
    format: request.format,
    labelThreshold: request.labelThreshold,
  })

  if (!config) {
    throw new UnprocessableDataError(
      'unable to build chart configuration from data',
    )
  }

  const withLegend = CHART_TYPES_WITH_LEGEND.has(request.type)
  const contentWidth = Math.max(1, request.width - EXPORT_PADDING * 2)
  const contentHeight = Math.max(1, request.height - EXPORT_PADDING * 2)

  const titleHeight = request.title
    ? measureTitleHeight(request.title, contentWidth)
    : 0

  const chartAreaHeight = Math.max(1, contentHeight - titleHeight)

  let chartCanvas = new Canvas(contentWidth, chartAreaHeight)
  let chart = new Chart(asChartJsCanvas(chartCanvas), config)

  chart.resize(contentWidth, chartAreaHeight)
  chart.update()

  if (withLegend) {
    const legendHeight = measureLegendHeight(chart, contentWidth)

    if (legendHeight > 0) {
      const chartHeight = Math.max(1, chartAreaHeight - legendHeight)
      chart.destroy()
      chartCanvas = new Canvas(contentWidth, chartHeight)
      chart = new Chart(asChartJsCanvas(chartCanvas), config)
      chart.resize(contentWidth, chartHeight)
      chart.update()
    }
  }

  let contentCanvas = await compositeLegend({
    chartCanvas,
    chart,
    withLegend,
    pixelRatio: DEVICE_PIXEL_RATIO,
  })

  if (request.title) {
    contentCanvas = await compositeTitle({
      chartCanvas: contentCanvas,
      title: request.title,
      pixelRatio: DEVICE_PIXEL_RATIO,
    })
  }

  fillWhiteBackground(contentCanvas)

  const exportCanvas = await addExportPadding({
    canvas: contentCanvas,
    outputWidth: request.width * DEVICE_PIXEL_RATIO,
    outputHeight: request.height * DEVICE_PIXEL_RATIO,
    padding: EXPORT_PADDING * DEVICE_PIXEL_RATIO,
  })

  const filename = `${crypto.randomUUID()}.png`
  const filepath = `${OUTPUT_DIR}/${filename}`
  const pngBuffer = await exportCanvas.toBuffer('png')

  await mkdir(OUTPUT_DIR, { recursive: true })
  await Bun.write(filepath, pngBuffer)

  chart.destroy()

  return { filename }
}
