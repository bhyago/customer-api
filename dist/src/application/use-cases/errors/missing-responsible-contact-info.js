"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingResponsibleContactInfoError = void 0;
class MissingResponsibleContactInfoError extends Error {
    constructor() {
        super(`Para cadastrar dependentes é necessário informar o número de telefone ou email do responsável.`);
        this.name = 'MISSING_RESPONSIBLE_CONTACT_INFO_ERROR';
    }
}
exports.MissingResponsibleContactInfoError = MissingResponsibleContactInfoError;
//# sourceMappingURL=missing-responsible-contact-info.js.map