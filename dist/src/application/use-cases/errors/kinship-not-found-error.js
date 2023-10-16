"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinshipNotFoundError = void 0;
class KinshipNotFoundError extends Error {
    constructor(dependentName) {
        super(`O grau de parentesco informado para o cliente ${dependentName} não foi encontrado.`);
        this.name = 'KINSHIP_NOT_FOUND_ERROR';
    }
}
exports.KinshipNotFoundError = KinshipNotFoundError;
//# sourceMappingURL=kinship-not-found-error.js.map