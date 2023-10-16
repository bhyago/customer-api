export class DependencyDegreeNotFoundError extends Error {
  constructor(dependentName: string) {
    super(
      `O grau de dependência informado para o cliente ${dependentName} não foi encontrado.`,
    )
    this.name = 'DEPENDENCY_DEGREE_NOT_FOUND'
  }
}
