import { INTER_FONT_FAMILY } from '#/constants/export.ts'

export function getInterFontCss(size: number, weight?: number): string {
  if (weight !== undefined) {
    return `${weight} ${size}px ${INTER_FONT_FAMILY}`
  }

  return `${size}px ${INTER_FONT_FAMILY}`
}
