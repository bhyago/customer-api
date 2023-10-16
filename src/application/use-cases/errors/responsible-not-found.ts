export class ResponsibleNotFoundError extends Error {
  constructor() {
    super('O responsável informado não foi encontrado.')
    this.name = 'RESPONSIBLE_NOT_FOUND_ERROR'
  }
}
