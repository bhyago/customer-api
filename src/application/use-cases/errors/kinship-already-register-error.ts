export class KinshipAlreadyRegisteredError extends Error {
  constructor() {
    super(
      `Já existe grau parentesco registrado entre os dois clientes informados.`,
    )
    this.name = 'KINSHIP_ALREADY_REGISTERED_ERROR'
  }
}
