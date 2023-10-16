export class SimultaneousDependentResponsibleError extends Error {
  constructor() {
    super(
      `O indivíduo identificado como dependente não pode assumir simultaneamente o papel de responsável.`,
    )
    this.name = 'SIMULTANEOUS_DEPENDENT_RESPOSIBLE_ERROR'
  }
}
