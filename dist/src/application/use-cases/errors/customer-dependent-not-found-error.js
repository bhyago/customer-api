"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDependentNotFoundError = void 0;
class CustomerDependentNotFoundError extends Error {
    constructor() {
        super('cliente dependente informado não foi encotrado.');
        this.name = 'CUSTOMER_DEPENDENT_NOT_FOUND_ERROR';
    }
}
exports.CustomerDependentNotFoundError = CustomerDependentNotFoundError;
//# sourceMappingURL=customer-dependent-not-found-error.js.map