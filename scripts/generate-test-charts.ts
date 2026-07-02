import { mkdir, rename } from 'node:fs/promises'
import { join } from 'node:path'

import { OUTPUT_DIR } from '@/constants/export.ts'
import { renderChartImage } from '@/server/render-chart-image.ts'

import { visualRegressionCases } from './generate-test-charts.fixtures.ts'

const REGRESSION_DIR = join(OUTPUT_DIR, 'visual-regression')

await mkdir(REGRESSION_DIR, { recursive: true })

const results: { name: string; path: string; bytes: number }[] = []
const failures: { name: string; error: string }[] = []

for (const { name, request } of visualRegressionCases) {
  try {
    const { filename } = await renderChartImage(request)

    const sourcePath = join(OUTPUT_DIR, filename)
    const targetPath = join(REGRESSION_DIR, `${name}.png`)
    await rename(sourcePath, targetPath)

    const file = Bun.file(targetPath)
    results.push({ name, path: targetPath, bytes: file.size })
    console.info(`✓ ${name} (${file.size} bytes)`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    failures.push({ name, error: message })
    console.error(`✗ ${name}: ${message}`)
  }
}

console.info('')
console.info(
  `Generated ${results.length}/${visualRegressionCases.length} charts in ${REGRESSION_DIR}/`,
)

if (failures.length > 0) {
  console.error(`Failed: ${failures.map((failure) => failure.name).join(', ')}`)
  throw new Error(`${failures.length} chart(s) failed to generate`)
}
