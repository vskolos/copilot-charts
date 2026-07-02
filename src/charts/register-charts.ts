import Chart from 'chart.js/auto'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import { TreemapController, TreemapElement } from 'chartjs-chart-treemap'

let registered = false

export function registerCharts() {
  if (registered) {
    return
  }

  Chart.register(
    MatrixController,
    MatrixElement,
    TreemapController,
    TreemapElement,
  )

  registered = true
}
