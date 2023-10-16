export class InvalidOriginError extends Error {
  constructor() {
    super(`Invalid Origin.`)
    this.name = 'INVALID_ORIGIN_ERROR'
  }
}
