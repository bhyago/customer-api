"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependent = void 0;
const entity_1 = require("../../core/entities/entity");
class Dependent extends entity_1.Entity {
    static create(props) {
        return new Dependent({
            ...props,
            active: true,
        });
    }
    static restore(props) {
        return new Dependent({
            ...props,
        });
    }
}
exports.Dependent = Dependent;
//# sourceMappingURL=dependent.js.map