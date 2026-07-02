import type { Chart, ChartMeta } from 'chart.js'

import { X_AXIS_KEY, Y_AXIS_KEY } from '#/constants/config-keys.ts'
import { getInterFontCss } from '#/utils/get-inter-font-css.ts'

type ArcLike = {
  [X_AXIS_KEY]: number
  [Y_AXIS_KEY]: number
  startAngle: number
  endAngle: number
  innerRadius: number
  outerRadius: number
}

function isArcLike(value: unknown): value is ArcLike {
  return (
    typeof value === 'object' &&
    value !== null &&
    X_AXIS_KEY in value &&
    Y_AXIS_KEY in value &&
    'startAngle' in value &&
    'endAngle' in value &&
    'innerRadius' in value &&
    'outerRadius' in value
  )
}

function isDoughnutChart(chart: Chart): boolean {
  return 'type' in chart.config && chart.config.type === 'doughnut'
}

export function createDonutLabelsPlugin(labelThreshold = 0.05) {
  return {
    id: 'donutLabels',

    afterDatasetsDraw(chart: Chart) {
      if (!isDoughnutChart(chart)) {
        return
      }

      const { ctx } = chart
      const meta = chart.getDatasetMeta(0) as ChartMeta<'doughnut'>
      const { total } = meta

      if (!total) {
        return
      }

      ctx.save()
      ctx.fillStyle = '#fff'
      ctx.font = getInterFontCss(13)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (const [index, element] of meta.data.entries()) {
        const value = Number(chart.data.datasets[0]?.data[index])

        if (value <= total * labelThreshold) {
          continue
        }

        if (!isArcLike(element)) {
          continue
        }

        const angle = (element.startAngle + element.endAngle) / 2
        const radius = (element.innerRadius + element.outerRadius) / 2
        const xCoord = element[X_AXIS_KEY] + Math.cos(angle) * radius
        const yCoord = element[Y_AXIS_KEY] + Math.sin(angle) * radius
        const percent = `${((value / total) * 100).toFixed(2)}%`

        ctx.fillText(percent, xCoord, yCoord)
      }

      ctx.restore()
    },
  }
}
