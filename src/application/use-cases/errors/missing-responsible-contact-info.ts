export class MissingResponsibleContactInfoError extends Error {
  constructor() {
    super(
      `Para cadastrar dependentes é necessário informar o número de telefone ou email do responsável.`,
    )
    this.name = 'MISSING_RESPONSIBLE_CONTACT_INFO_ERROR'
  }
}
