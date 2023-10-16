"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgDegreeKinshipRepository = void 0;
const common_1 = require("@nestjs/common");
const lib_1 = require("@spotmetrics/orm-lib/lib");
let PgDegreeKinshipRepository = class PgDegreeKinshipRepository extends lib_1.PgNestBaseRepository {
    tableName() {
        return 'degreekinship';
    }
    async findById(id) {
        return await this.CRUD.findOne({
            id_degreekinship: id,
        });
    }
    async findMany(input) {
        const limit = input.limit || 100;
        return await this.pg.runQuery((0, lib_1.format)(`
        WITH result AS (
          SELECT *
          FROM degreekinship
          ORDER BY ${input.sortBy ?? 'nme_degreekinship '.concat(input.order ?? 'ASC')}
        )
        SELECT
          result.*,
          COUNT(*) OVER () AS total
        FROM
          result
        LIMIT limit
        OFFSET ${input.page ? (input.page > 0 ? (input?.page - 1) * limit : 0) : 0}`));
    }
};
exports.PgDegreeKinshipRepository = PgDegreeKinshipRepository;
exports.PgDegreeKinshipRepository = PgDegreeKinshipRepository = __decorate([
    (0, common_1.Injectable)()
], PgDegreeKinshipRepository);
//# sourceMappingURL=pg-degree-kinship-repository.js.map