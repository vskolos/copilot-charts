import type { DataFormat } from '#/schemas/data-format-schema.ts'

export type TableData = {
  rows: string[][]
  cols: string[][]
}

export type ChartJsType =
  | 'bar'
  | 'line'
  | 'scatter'
  | 'bubble'
  | 'pie'
  | 'doughnut'
  | 'polarArea'
  | 'radar'
  | 'treemap'
  | 'matrix'

export type ChartOptions = {
  softColors: boolean
  data: TableData
  format: DataFormat
  labelThreshold?: number
}
