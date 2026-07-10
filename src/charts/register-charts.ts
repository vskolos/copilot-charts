import type { ChartComponent } from 'chart.js'

import Chart from 'chart.js/auto'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap'

let registered = false

// chartjs-chart-treemap omits ChartComponent from its controller typings
const treemapController: ChartComponent = Object.assign(TreemapController, {
  id: 'treemap',
})

export function registerCharts() {
  if (registered) {
    return
  }

  Chart.register(
    MatrixController,
    MatrixElement,
    treemapController,
    TreemapElement,
  )

  registered = true
}
