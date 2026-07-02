export function pipe<Config>(
  initial: Config,
  ...fns: ((config: Config) => Config)[]
): Config {
  let result = initial

  for (const fn of fns) {
    result = fn(result)
  }

  return result
}
