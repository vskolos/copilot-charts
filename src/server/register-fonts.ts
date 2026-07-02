import Chart from 'chart.js/auto'
import { FontLibrary } from 'skia-canvas'

import { INTER_FONT_FAMILY } from '@/constants/export.ts'

let registered = false

const INTER_FONT_FILES = [
  'Inter-Regular.woff2',
  'Inter-SemiBold.woff2',
  'Inter-Bold.woff2',
] as const

export function interFontPaths() {
  return INTER_FONT_FILES.map((file) =>
    Bun.resolveSync(`../assets/fonts/${file}`, import.meta.dirname),
  )
}

export function registerFonts() {
  if (registered) {
    return
  }

  FontLibrary.use('Inter', interFontPaths())

  Chart.defaults.font.family = INTER_FONT_FAMILY
  registered = true
}
