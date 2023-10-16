"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyDegreeNotFoundError = void 0;
class DependencyDegreeNotFoundError extends Error {
    constructor(dependentName) {
        super(`O grau de dependência informado para o cliente ${dependentName} não foi encontrado.`);
        this.name = 'DEPENDENCY_DEGREE_NOT_FOUND';
    }
}
exports.DependencyDegreeNotFoundError = DependencyDegreeNotFoundError;
//# sourceMappingURL=dependency-degree-not-found-error.js.map