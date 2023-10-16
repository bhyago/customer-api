export class KinshipNotFoundError extends Error {
  constructor(dependentName: string) {
    super(
      `O grau de parentesco informado para o cliente ${dependentName} não foi encontrado.`,
    )
    this.name = 'KINSHIP_NOT_FOUND_ERROR'
  }
}
