export function getChartColor({
  index,
  opacity = 1,
}: {
  index: number
  opacity?: number
}): string {
  const colors = [
    `hsl(173, 70%, 35%, ${opacity})`,
    `hsl(47, 95%, 52%, ${opacity})`,
    `hsl(160, 100%, 45%, ${opacity})`,
    `hsl(122, 39%, 49%, ${opacity})`,
    `hsl(254, 55%, 59%, ${opacity})`,
    `hsl(351, 100%, 64%, ${opacity})`,
    `hsl(40, 99%, 55%, ${opacity})`,
    `hsl(206, 100%, 49%, ${opacity})`,
  ] as const

  return colors[index % colors.length] ?? colors[0]
}
