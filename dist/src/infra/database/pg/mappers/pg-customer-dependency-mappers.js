"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgCustomerDependencyMapper = void 0;
const dependent_1 = require("../../../../domain/entities/dependent");
class PgCustomerDependencyMapper {
    static toDomain(pg) {
        return dependent_1.Dependent.restore({
            degreekinshipId: pg.id_degreekinship,
            dependentId: pg.id_clientdependency,
            responsibleId: pg.id_clientresponsable,
            active: pg.flg_active,
        });
    }
    static toPg(domain) {
        return {
            id_clientdependency: domain.props.dependentId,
            id_clientresponsable: domain.props.dependentId,
            flg_active: domain.props.active,
            id_degreekinship: domain.props.degreekinshipId,
        };
    }
}
exports.PgCustomerDependencyMapper = PgCustomerDependencyMapper;
//# sourceMappingURL=pg-customer-dependency-mappers.js.map