import type { ChartConfiguration, TooltipOptions } from 'chart.js'

type TooltipConfig = {
  mode?: TooltipOptions['mode']
  position?: TooltipOptions['position']
  intersect?: boolean
  bodySpacing?: number
  callbacks?: Partial<NonNullable<TooltipOptions['callbacks']>>
}

export function addTooltip({
  mode,
  position,
  intersect,
  bodySpacing,
  callbacks,
}: TooltipConfig) {
  return (config: ChartConfiguration): ChartConfiguration => ({
    ...config,
    options: {
      ...config.options,
      plugins: {
        ...config.options?.plugins,
        tooltip: {
          mode,
          position,
          intersect,
          backgroundColor: '#fff',
          borderColor: '#dee2e6',
          borderWidth: 1,
          titleColor: '#000',
          bodyColor: '#111',
          padding: 16,
          boxPadding: 5,
          bodySpacing,
          usePointStyle: true,
          callbacks,
        },
      },
    },
  })
}
