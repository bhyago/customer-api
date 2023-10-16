"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinshipAlreadyRegisteredError = void 0;
class KinshipAlreadyRegisteredError extends Error {
    constructor() {
        super(`Já existe grau parentesco registrado entre os dois clientes informados.`);
        this.name = 'KINSHIP_ALREADY_REGISTERED_ERROR';
    }
}
exports.KinshipAlreadyRegisteredError = KinshipAlreadyRegisteredError;
//# sourceMappingURL=kinship-already-register-error.js.map