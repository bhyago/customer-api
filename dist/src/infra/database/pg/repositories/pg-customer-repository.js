"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgCustomerRepository = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("@spotmetrics/orm-lib/lib");
const pg_customer_mappers_1 = require("../mappers/pg-customer-mappers");
let PgCustomerRepository = class PgCustomerRepository extends lib_1.PgNestBaseRepository {
    async save(input) {
        const newCustomer = await this.CRUD.create(pg_customer_mappers_1.PgCustomerMapper.toPg(input));
        return pg_customer_mappers_1.PgCustomerMapper.toDomain(newCustomer);
    }
    update(input) {
        throw new Error('Method not implemented.');
    }
    async findById(input) {
        const customer = await this.CRUD.findOne({
            id: input.id,
            id_mall: input.mallId,
        });
        if (!customer) {
            return null;
        }
        return pg_customer_mappers_1.PgCustomerMapper.toDomain(customer);
    }
    tableName() {
        return 'client';
    }
};
exports.PgCustomerRepository = PgCustomerRepository;
exports.PgCustomerRepository = PgCustomerRepository = __decorate([
    (0, common_1.Injectable)()
], PgCustomerRepository);
//# sourceMappingURL=pg-customer-repository.js.map