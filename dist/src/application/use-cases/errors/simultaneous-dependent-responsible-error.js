"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimultaneousDependentResponsibleError = void 0;
class SimultaneousDependentResponsibleError extends Error {
    constructor() {
        super(`O indivíduo identificado como dependente não pode assumir simultaneamente o papel de responsável.`);
        this.name = 'SIMULTANEOUS_DEPENDENT_RESPOSIBLE_ERROR';
    }
}
exports.SimultaneousDependentResponsibleError = SimultaneousDependentResponsibleError;
//# sourceMappingURL=simultaneous-dependent-responsible-error.js.map