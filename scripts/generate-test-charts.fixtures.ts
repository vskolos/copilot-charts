import type { ChartImageRequest } from '@/schemas/chart-image-request-schema.ts'
import type { EntryData } from '@/schemas/entry-data-schema.ts'

type VisualRegressionCase = {
  name: string
  request: ChartImageRequest
}

const months12: EntryData = {
  Revenue: {
    m01: 12_000,
    m02: 15_000,
    m03: 13_500,
    m04: 18_000,
    m05: 16_200,
    m06: 19_800,
    m07: 21_000,
    m08: 20_500,
    m09: 17_400,
    m10: 22_100,
    m11: 24_000,
    m12: 28_500,
  },
  Costs: {
    m01: 8000,
    m02: 9000,
    m03: 8500,
    m04: 9500,
    m05: 9200,
    m06: 10_100,
    m07: 10_800,
    m08: 10_400,
    m09: 9900,
    m10: 11_200,
    m11: 11_800,
    m12: 12_500,
  },
}

const manySeries: EntryData = {
  Alpha: { m01: 40, m02: 55, m03: 48, m04: 62 },
  Beta: { m01: 30, m02: 42, m03: 38, m04: 50 },
  Gamma: { m01: 25, m02: 35, m03: 30, m04: 44 },
  Delta: { m01: 18, m02: 28, m03: 22, m04: 36 },
  Epsilon: { m01: 12, m02: 20, m03: 16, m04: 28 },
  Zeta: { m01: 8, m02: 14, m03: 10, m04: 22 },
}

const stackedDominantSegment: EntryData = {
  'Product A': { Q1: 850, Q2: 920, Q3: 880, Q4: 910 },
  'Product B': { Q1: 45, Q2: 38, Q3: 52, Q4: 41 },
  'Product C': { Q1: 30, Q2: 25, Q3: 28, Q4: 22 },
  'Product D': { Q1: 15, Q2: 12, Q3: 18, Q4: 14 },
}

const stackedEvenSplit: EntryData = {
  East: { m01: 100, m02: 110, m03: 105 },
  West: { m01: 95, m02: 108, m03: 102 },
  North: { m01: 98, m02: 112, m03: 99 },
  South: { m01: 102, m02: 107, m03: 101 },
}

const heatmapLarge: EntryData = {
  Mon: { '9am': 12, '12pm': 45, '3pm': 38, '6pm': 22, '9pm': 8 },
  Tue: { '9am': 18, '12pm': 52, '3pm': 41, '6pm': 28, '9pm': 11 },
  Wed: { '9am': 15, '12pm': 48, '3pm': 44, '6pm': 31, '9pm': 9 },
  Thu: { '9am': 20, '12pm': 55, '3pm': 47, '6pm': 35, '9pm': 14 },
  Fri: { '9am': 22, '12pm': 60, '3pm': 50, '6pm': 40, '9pm': 18 },
  Sat: { '9am': 8, '12pm': 25, '3pm': 30, '6pm': 35, '9pm': 22 },
  Sun: { '9am': 5, '12pm': 18, '3pm': 22, '6pm': 28, '9pm': 15 },
}

const heatmapSparse: EntryData = {
  RowA: { Col1: 0, Col2: 0, Col3: 95, Col4: 0 },
  RowB: { Col1: 2, Col2: 0, Col3: 0, Col4: 3 },
  RowC: { Col1: 0, Col2: 48, Col3: 0, Col4: 0 },
}

const barManyCategories: EntryData = {
  'Q1 2025': {
    'Product A': 450,
    'Product B': 320,
    'Product C': 180,
    'Product D': 90,
    'Product E': 65,
    'Product F': 42,
    'Product G': 28,
    'Product H': 15,
  },
}

const barLongLabels: EntryData = {
  'Reporting period': {
    'Customer acquisition cost (paid channels)': 1_250_000,
    'Customer acquisition cost (organic)': 420_000,
    'Lifetime value — enterprise tier': 8_900_000,
    'Lifetime value — self-serve tier': 1_200_000,
  },
}

const barSmallValues: EntryData = {
  Week: { Alpha: 3, Beta: 7, Gamma: 2, Delta: 9, Epsilon: 1 },
}

const donutManySlices: EntryData = {
  Total: {
    Chrome: 42,
    Safari: 22,
    Firefox: 14,
    Edge: 12,
    Opera: 4,
    Brave: 3,
    Other: 3,
  },
}

const donutDominantSlice: EntryData = {
  Share: {
    Leader: 92,
    Challenger: 4,
    Niche: 2,
    Other: 2,
  },
}

// Several slices above 5% but below 15% — low threshold labels all, high threshold labels only Leader.
const donutMixedSlices: EntryData = {
  Share: {
    Leader: 48,
    Alpha: 14,
    Beta: 13,
    Gamma: 13,
    Delta: 12,
  },
}

const donutTwoSlices: EntryData = {
  Split: { Yes: 68, No: 32 },
}

const radarManyAxes: EntryData = {
  Score: {
    Speed: 78,
    Quality: 92,
    Cost: 65,
    Support: 88,
    Security: 95,
    Usability: 82,
    Reliability: 90,
    Scalability: 74,
  },
}

const radarMultiSeries: EntryData = {
  'Team A': {
    Speed: 85,
    Quality: 72,
    Cost: 60,
    Support: 90,
    Features: 78,
  },
  'Team B': {
    Speed: 70,
    Quality: 88,
    Cost: 75,
    Support: 65,
    Features: 92,
  },
}

const bubbleBasic: EntryData = {
  'Product A': { x: 20, y: 30, r: 15 },
  'Product B': { x: 40, y: 10, r: 10 },
  'Product C': { x: 30, y: 50, r: 20 },
  'Product D': { x: 60, y: 35, r: 12 },
}

const bubbleSoft: EntryData = {
  Alpha: { x: 10, y: 80, r: 8 },
  Beta: { x: 45, y: 55, r: 18 },
  Gamma: { x: 75, y: 25, r: 14 },
}

const treemapUneven: EntryData = {
  Portfolio: {
    'Mega Corp': 45_000_000,
    'Mid Co': 3_200_000,
    Startup: 450_000,
    Micro: 12_000,
    Tiny: 800,
  },
}

const treemapManyItems: EntryData = {
  Market: {
    Alpha: 120,
    Beta: 95,
    Gamma: 88,
    Delta: 76,
    Epsilon: 64,
    Zeta: 52,
    Eta: 41,
    Theta: 33,
    Iota: 27,
    Kappa: 19,
    Lambda: 14,
    Mu: 8,
  },
}

function formatRegressionTitle(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function regressionCase(
  name: string,
  {
    type,
    data,
    width,
    height,
    format,
    softColors,
    labelThreshold,
    title,
  }: Pick<ChartImageRequest, 'type' | 'data'> &
    Partial<
      Pick<
        ChartImageRequest,
        | 'width'
        | 'height'
        | 'format'
        | 'softColors'
        | 'labelThreshold'
        | 'title'
      >
    >,
): VisualRegressionCase {
  return {
    name,
    request: {
      type,
      data,
      width: width ?? 600,
      height: height ?? 400,
      format: format ?? 'unit',
      softColors,
      labelThreshold,
      title: title ?? formatRegressionTitle(name),
    },
  }
}

export const visualRegressionCases: VisualRegressionCase[] = [
  // line

  regressionCase('line-basic-money', {
    type: 'line',
    data: months12,
    format: 'money',
  }),

  regressionCase('line-many-series-soft', {
    type: 'line',
    data: manySeries,
    softColors: true,
  }),

  regressionCase('line-percent-format', {
    type: 'line',
    data: {
      'Conv. rate': { m01: 0.032, m02: 0.041, m03: 0.038, m04: 0.045 },
      Bounce: { m01: 0.58, m02: 0.52, m03: 0.55, m04: 0.49 },
    },
    format: 'percent',
  }),

  regressionCase('line-time-format', {
    type: 'line',
    data: {
      'Avg session': {
        m01: 186,
        m02: 204,
        m03: 192,
        m04: 218,
        m05: 225,
        m06: 210,
      },
      'Median session': {
        m01: 142,
        m02: 158,
        m03: 149,
        m04: 165,
        m05: 171,
        m06: 160,
      },
    },
    format: 'time',
  }),

  regressionCase('line-multiline-title', {
    type: 'line',
    data: months12,
    width: 360,
    height: 320,
    format: 'money',
    title:
      'Quarterly revenue and operating cost trends across all business units',
  }),

  // area

  regressionCase('area-basic', {
    type: 'area',
    data: months12,
    format: 'money',
  }),

  regressionCase('area-many-series', { type: 'area', data: manySeries }),

  regressionCase('area-soft-colors', {
    type: 'area',
    data: months12,
    softColors: true,
    format: 'money',
  }),

  regressionCase('area-wide-canvas', {
    type: 'area',
    data: months12,
    width: 900,
    height: 300,
    format: 'money',
  }),

  // stacked bar

  regressionCase('stacked-bar-even-split', {
    type: 'stacked bar',
    data: stackedEvenSplit,
    format: 'unit',
  }),

  regressionCase('stacked-bar-dominant-segment', {
    type: 'stacked bar',
    data: stackedDominantSegment,
    labelThreshold: 0.05,
  }),

  regressionCase('stacked-bar-high-threshold', {
    type: 'stacked bar',
    data: stackedDominantSegment,
    labelThreshold: 0.2,
  }),

  regressionCase('stacked-bar-money-soft', {
    type: 'stacked bar',
    data: {
      'Dept A': { m01: 1_200_000, m02: 1_350_000, m03: 1_180_000 },
      'Dept B': { m01: 890_000, m02: 920_000, m03: 950_000 },
      'Dept C': { m01: 450_000, m02: 480_000, m03: 510_000 },
    },
    format: 'money',
    softColors: true,
  }),

  regressionCase('stacked-bar-many-periods', {
    type: 'stacked bar',
    data: {
      Alpha: {
        m01: 10,
        m02: 12,
        m03: 11,
        m04: 14,
        m05: 13,
        m06: 15,
        m07: 16,
        m08: 14,
        m09: 13,
        m10: 17,
        m11: 18,
        m12: 20,
      },
      Beta: {
        m01: 8,
        m02: 9,
        m03: 10,
        m04: 11,
        m05: 10,
        m06: 12,
        m07: 11,
        m08: 10,
        m09: 9,
        m10: 12,
        m11: 13,
        m12: 14,
      },
      Gamma: {
        m01: 5,
        m02: 6,
        m03: 5,
        m04: 7,
        m05: 6,
        m06: 8,
        m07: 7,
        m08: 6,
        m09: 5,
        m10: 8,
        m11: 9,
        m12: 10,
      },
    },
  }),

  // heatmap

  regressionCase('heatmap-weekly', { type: 'heatmap', data: heatmapLarge }),
  regressionCase('heatmap-sparse', { type: 'heatmap', data: heatmapSparse }),

  regressionCase('heatmap-single-row', {
    type: 'heatmap',
    data: { Only: { ColA: 10, ColB: 25, ColC: 18, ColD: 32 } },
  }),

  regressionCase('heatmap-percent', {
    type: 'heatmap',
    data: {
      Mon: { AM: 0.12, PM: 0.45 },
      Tue: { AM: 0.18, PM: 0.52 },
    },
    format: 'percent',
  }),

  regressionCase('heatmap-tall-canvas', {
    type: 'heatmap',
    data: heatmapLarge,
    width: 400,
    height: 600,
  }),

  // bar

  regressionCase('bar-basic-soft', {
    type: 'bar',
    data: barManyCategories,
    softColors: true,
  }),

  regressionCase('bar-many-categories', {
    type: 'bar',
    data: barManyCategories,
  }),

  regressionCase('bar-long-labels-money', {
    type: 'bar',
    data: barLongLabels,
    format: 'money',
    title: 'Customer acquisition and lifetime value by reporting period',
  }),

  regressionCase('bar-small-values', { type: 'bar', data: barSmallValues }),

  regressionCase('bar-percent', {
    type: 'bar',
    data: {
      Survey: { Agree: 0.72, Neutral: 0.18, Disagree: 0.1 },
    },
    format: 'percent',
  }),

  regressionCase('bar-narrow', {
    type: 'bar',
    data: barManyCategories,
    width: 360,
    height: 280,
  }),

  // donut

  regressionCase('donut-many-slices', { type: 'donut', data: donutManySlices }),

  regressionCase('donut-dominant-slice', {
    type: 'donut',
    data: donutDominantSlice,
    labelThreshold: 0.05,
  }),

  regressionCase('donut-high-threshold', {
    type: 'donut',
    data: donutMixedSlices,
    labelThreshold: 0.15,
  }),

  regressionCase('donut-two-slices', {
    type: 'donut',
    data: donutTwoSlices,
    softColors: true,
  }),

  regressionCase('donut-money', {
    type: 'donut',
    data: {
      Revenue: {
        SaaS: 4_500_000,
        Services: 1_200_000,
        Hardware: 350_000,
        Other: 80_000,
      },
    },
    format: 'money',
  }),

  // radar

  regressionCase('radar-many-axes', { type: 'radar', data: radarManyAxes }),

  regressionCase('radar-percent', {
    type: 'radar',
    data: {
      KPI: { Uptime: 0.999, Latency: 0.85, Errors: 0.02, Coverage: 0.78 },
    },
    format: 'percent',
  }),

  regressionCase('radar-few-axes', {
    type: 'radar',
    data: { Score: { AxisA: 80, AxisB: 65, AxisC: 90 } },
  }),

  regressionCase('radar-square', {
    type: 'radar',
    data: radarManyAxes,
    width: 400,
    height: 400,
  }),

  regressionCase('radar-multi-series', {
    type: 'radar',
    data: radarMultiSeries,
    softColors: true,
  }),

  // bubble

  regressionCase('bubble-basic', { type: 'bubble', data: bubbleBasic }),

  regressionCase('bubble-soft-colors', {
    type: 'bubble',
    data: bubbleSoft,
    softColors: true,
  }),

  // polar area

  regressionCase('polar-area-many-slices', {
    type: 'polar area',
    data: donutManySlices,
  }),

  regressionCase('polar-area-two-slices', {
    type: 'polar area',
    data: donutTwoSlices,
    softColors: true,
  }),

  // treemap

  regressionCase('treemap-uneven', {
    type: 'treemap',
    data: treemapUneven,
    format: 'money',
  }),

  regressionCase('treemap-many-items', {
    type: 'treemap',
    data: treemapManyItems,
  }),

  regressionCase('treemap-soft-two-items', {
    type: 'treemap',
    data: {
      Split: { Large: 900, Small: 100 },
    },
    softColors: true,
  }),

  regressionCase('treemap-long-labels', {
    type: 'treemap',
    data: {
      Categories: {
        'Enterprise software licensing': 520,
        'Professional services & consulting': 310,
        'Hardware maintenance contracts': 180,
        'Training & certification': 45,
      },
    },
    title: 'Annual revenue breakdown by product category and service line',
  }),
]
