import type { DataFormat } from '@/schemas/data-format-schema.ts'

export function formatter(format: DataFormat, alternative?: boolean) {
  return (value: string | number) => {
    if (typeof value === 'string' && Number.isNaN(Number(value))) {
      return value
    }

    const number = typeof value === 'number' ? value : Number(value)

    if (Number.isNaN(number)) {
      return ''
    }

    if (format === 'money') {
      return alternative ? formatLargeNumber(number) : formatNumber(number)
    }

    if (format === 'percent') {
      return formatPercents(number)
    }

    if (format === 'time') {
      return formatSeconds(number)
    }

    return formatNumber(number, 0)
  }
}

function formatNumber(number: number, maximumFractionDigits?: number): string {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: maximumFractionDigits ?? 2,
  }).format(number)
}

function formatLargeNumber(number: number): string {
  if (number < 0) {
    return `-${formatLargeNumber(-number)}`
  }

  if (number < 1_000_000) {
    return formatNumber(number)
  }

  if (number < 1_000_000_000) {
    return `${formatNumber(number / 1_000_000)} млн`
  }

  return `${formatNumber(number / 1_000_000_000)} млрд`
}

function padTimePart(value: number): string {
  return value > 9 ? String(value) : `0${value}`
}

function formatSeconds(number: number): string {
  const rounded = Math.round(number)
  const hours = Math.floor(rounded / 3600)
  const minutes = Math.floor((rounded - hours * 3600) / 60)
  const seconds = rounded - hours * 3600 - minutes * 60
  return `${hours}:${padTimePart(minutes)}:${padTimePart(seconds)}`
}

function formatPercents(number: number): string {
  return `${formatNumber(number)}%`
}
