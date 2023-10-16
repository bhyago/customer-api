export class CustomerDependentNotFoundError extends Error {
  constructor() {
    super('cliente dependente informado não foi encotrado.')
    this.name = 'CUSTOMER_DEPENDENT_NOT_FOUND_ERROR'
  }
}
