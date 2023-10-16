"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsibleNotFoundError = void 0;
class ResponsibleNotFoundError extends Error {
    constructor() {
        super('O responsável informado não foi encontrado.');
        this.name = 'RESPONSIBLE_NOT_FOUND_ERROR';
    }
}
exports.ResponsibleNotFoundError = ResponsibleNotFoundError;
//# sourceMappingURL=responsible-not-found.js.map