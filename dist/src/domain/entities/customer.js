"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const entity_1 = require("../../core/entities/entity");
class Customer extends entity_1.Entity {
    static create(props) {
        return new Customer({
            ...props,
            active: true,
            blocked: false,
            loyaltyBlocked: false,
            registerDate: new Date(),
            password: props.password ?? '',
            isComplete: true,
            emailValid: !!props.email,
        });
    }
    static restore(props, id) {
        return new Customer({
            ...props,
        }, id);
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map