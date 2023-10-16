"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgDependentRepository = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("@spotmetrics/orm-lib/lib");
const pg_customer_dependency_mappers_1 = require("../mappers/pg-customer-dependency-mappers");
let PgDependentRepository = class PgDependentRepository extends lib_1.PgNestBaseRepository {
    async save(input) {
        await this.CRUD.create(pg_customer_dependency_mappers_1.PgCustomerDependencyMapper.toPg(input));
    }
    async findAssociationBetweenCustomer(input) {
        const result = await this.CRUD.findOne({
            id_clientdependency: input.dependentId,
            id_clientresponsable: input.responsibleId,
        });
        if (!result) {
            return null;
        }
        return pg_customer_dependency_mappers_1.PgCustomerDependencyMapper.toDomain(result);
    }
    tableName() {
        return 'clientdependecy';
    }
};
exports.PgDependentRepository = PgDependentRepository;
exports.PgDependentRepository = PgDependentRepository = __decorate([
    (0, common_1.Injectable)()
], PgDependentRepository);
//# sourceMappingURL=pg-customer-dependency-repository.js.map