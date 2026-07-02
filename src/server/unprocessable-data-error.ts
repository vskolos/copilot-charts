export class UnprocessableDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnprocessableDataError'
  }
}
