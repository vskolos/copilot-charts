export function getChartColor({
  index,
  opacity = 1,
}: {
  index: number
  opacity?: number
}): string {
  const colors = [
    `hsl(196, 61%, 56%, ${opacity})`,
    `hsl(42, 97%, 65%, ${opacity})`,
    `hsl(11, 100%, 71%, ${opacity})`,
    `hsl(168, 36%, 65%, ${opacity})`,
    `hsl(173, 18%, 51%, ${opacity})`,
    `hsl(32, 36%, 52%, ${opacity})`,
    `hsl(0, 16%, 43%, ${opacity})`,
    `hsl(200, 38%, 51%, ${opacity})`,
    `hsl(175, 61%, 82%, ${opacity})`,
    `hsl(45, 100%, 75%, ${opacity})`,
    `hsl(24, 100%, 83%, ${opacity})`,
    `hsl(193, 86%, 78%, ${opacity})`,
  ] as const

  return colors[index % colors.length] ?? colors[0]
}
