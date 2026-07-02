function getSoftColors(opacity: number): string[] {
  return [
    `hsl(168, 36%, 65%, ${opacity})`,
    `hsl(42, 97%, 65%, ${opacity})`,
    `hsl(11, 100%, 71%, ${opacity})`,
    `hsl(196, 61%, 56%, ${opacity})`,
    `hsl(173, 18%, 51%, ${opacity})`,
    `hsl(32, 36%, 52%, ${opacity})`,
    `hsl(0, 16%, 43%, ${opacity})`,
    `hsl(200, 38%, 51%, ${opacity})`,
    `hsl(175, 61%, 82%, ${opacity})`,
    `hsl(45, 100%, 75%, ${opacity})`,
    `hsl(24, 100%, 83%, ${opacity})`,
    `hsl(193, 86%, 78%, ${opacity})`,
  ]
}

function getDefaultColors(opacity: number): string[] {
  return [
    `hsl(173, 70%, 35%, ${opacity})`,
    `hsl(47, 95%, 52%, ${opacity})`,
    `hsl(160, 100%, 45%, ${opacity})`,
    `hsl(122, 39%, 49%, ${opacity})`,
    `hsl(254, 55%, 59%, ${opacity})`,
    `hsl(351, 100%, 64%, ${opacity})`,
    `hsl(40, 99%, 55%, ${opacity})`,
    `hsl(206, 100%, 49%, ${opacity})`,
  ]
}

export function getChartColor({
  index,
  softColors,
  opacity = 1,
}: {
  index: number
  softColors: boolean
  opacity?: number
}): string {
  const colors = softColors ? getSoftColors(opacity) : getDefaultColors(opacity)
  return colors[index % colors.length] ?? 'hsl(0, 0%, 0%)'
}
