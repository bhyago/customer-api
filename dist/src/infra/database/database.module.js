"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("@spotmetrics/orm-lib/lib");
const customer_1 = require("../../application/gateway-contracts/repositories/customer");
const degree_kinship_1 = require("../../application/gateway-contracts/repositories/degree-kinship");
const dependent_1 = require("../../application/gateway-contracts/repositories/dependent");
const mall_origin_repository_1 = require("../../application/gateway-contracts/repositories/mall-origin-repository");
const mall_repository_1 = require("../../application/gateway-contracts/repositories/mall-repository");
const pg_customer_dependency_repository_1 = require("./pg/repositories/pg-customer-dependency-repository");
const pg_customer_repository_1 = require("./pg/repositories/pg-customer-repository");
const pg_degree_kinship_repository_1 = require("./pg/repositories/pg-degree-kinship-repository");
const pg_mall_origin_repository_1 = require("./pg/repositories/pg-mall-origin-repository");
const pg_mall_repository_1 = require("./pg/repositories/pg-mall-repository");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            lib_1.PgNestDatabaseService,
            {
                provide: dependent_1.DependentRepository,
                useClass: pg_customer_dependency_repository_1.PgDependentRepository,
            },
            {
                provide: mall_repository_1.MallRepository,
                useClass: pg_mall_repository_1.PgMallRepository,
            },
            {
                provide: customer_1.CustomerRepository,
                useClass: pg_customer_repository_1.PgCustomerRepository,
            },
            {
                provide: degree_kinship_1.DegreeKinshipRepository,
                useClass: pg_degree_kinship_repository_1.PgDegreeKinshipRepository,
            },
            {
                provide: mall_origin_repository_1.MallOriginRepository,
                useClass: pg_mall_origin_repository_1.PgMallOriginRepository,
            },
        ],
        exports: [
            lib_1.PgNestDatabaseService,
            dependent_1.DependentRepository,
            mall_repository_1.MallRepository,
            customer_1.CustomerRepository,
            degree_kinship_1.DegreeKinshipRepository,
            mall_origin_repository_1.MallOriginRepository,
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map