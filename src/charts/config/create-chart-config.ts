import { createAreaChartConfig } from './create-area-chart-config.ts'
import { createBarChartConfig } from './create-bar-chart-config.ts'
import { createBubbleChartConfig } from './create-bubble-chart-config.ts'
import { createDonutChartConfig } from './create-donut-chart-config.ts'
import { createHeatMapChartConfig } from './create-heatmap-chart-config.ts'
import { createLineChartConfig } from './create-line-chart-config.ts'
import { createPolarAreaChartConfig } from './create-polar-area-chart-config.ts'
import { createRadarChartConfig } from './create-radar-chart-config.ts'
import { createStackedBarChartConfig } from './create-stacked-bar-chart-config.ts'
import { createTreeMapChartConfig } from './create-treemap-chart-config.ts'

export function createChartConfig(type: string) {
  if (type === 'area') {
    return createAreaChartConfig
  }

  if (type === 'bar') {
    return createBarChartConfig
  }

  if (type === 'stacked bar') {
    return createStackedBarChartConfig
  }

  if (type === 'line') {
    return createLineChartConfig
  }

  if (type === 'heatmap') {
    return createHeatMapChartConfig
  }

  if (type === 'donut') {
    return createDonutChartConfig
  }

  if (type === 'radar') {
    return createRadarChartConfig
  }

  if (type === 'treemap') {
    return createTreeMapChartConfig
  }

  if (type === 'bubble') {
    return createBubbleChartConfig
  }

  if (type === 'polar area') {
    return createPolarAreaChartConfig
  }

  return () => null
}
