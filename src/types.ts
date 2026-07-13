import type { DataFormat } from '@/schemas/data-format-schema.ts'

export type TableData = {
  columnHeaders: string[]
  rowHeaders: string[]
  values: number[][]
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
  data: TableData
  format: DataFormat
  labelThreshold?: number
}
