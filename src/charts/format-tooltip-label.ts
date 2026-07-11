import type { DataFormat } from '@/schemas/data-format-schema.ts'

import { R_AXIS_KEY, X_AXIS_KEY, Y_AXIS_KEY } from '@/constants/config-keys.ts'
import { formatter } from '@/format/formatter.ts'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readNumericField(parsed: unknown, key: string): number | undefined {
  if (!isRecord(parsed)) {
    return undefined
  }

  const value = parsed[key]
  return typeof value === 'number' ? value : undefined
}

function buildTooltipLabel(
  format: DataFormat,
  label: string | undefined,
  value: number | undefined,
): string {
  let result = label ?? ''

  if (result) {
    result += ': '
  }

  if (value !== undefined) {
    result += formatter(format)(value)
  }

  return result
}

type FormatTooltipLabelFn = (
  format: DataFormat,
  label: string | undefined,
  parsed: unknown,
) => string

export const formatTooltipLabel: Record<
  'yAxis' | 'radial' | 'scalar' | 'bubble',
  FormatTooltipLabelFn
> = {
  yAxis: (format, datasetLabel, parsed) =>
    buildTooltipLabel(
      format,
      datasetLabel,
      readNumericField(parsed, Y_AXIS_KEY),
    ),

  radial: (format, itemLabel, parsed) =>
    buildTooltipLabel(format, itemLabel, readNumericField(parsed, R_AXIS_KEY)),

  scalar: (format, itemLabel, parsed) =>
    buildTooltipLabel(
      format,
      itemLabel,
      typeof parsed === 'number' ? parsed : undefined,
    ),

  bubble: (format, itemLabel, raw) => {
    const formatValue = formatter(format)

    const xValue = readNumericField(raw, X_AXIS_KEY)
    const yValue = readNumericField(raw, Y_AXIS_KEY)
    const rValue = readNumericField(raw, R_AXIS_KEY)

    const parts: string[] = []

    if (xValue !== undefined) {
      parts.push(formatValue(xValue))
    }

    if (yValue !== undefined) {
      parts.push(formatValue(yValue))
    }

    if (rValue !== undefined) {
      parts.push(`r ${formatValue(rValue)}`)
    }

    let result = itemLabel ?? ''

    if (result) {
      result += ': '
    }

    result += parts.join(', ')

    return result
  },
}
