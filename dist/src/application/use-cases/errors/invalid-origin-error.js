"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidOriginError = void 0;
class InvalidOriginError extends Error {
    constructor() {
        super(`Invalid Origin.`);
        this.name = 'INVALID_ORIGIN_ERROR';
    }
}
exports.InvalidOriginError = InvalidOriginError;
//# sourceMappingURL=invalid-origin-error.js.map