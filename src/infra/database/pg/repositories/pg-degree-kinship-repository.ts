import { DegreeKinshipRepository } from '@/application/gateway-contracts/repositories/degree-kinship'
import { Injectable } from '@nestjs/common'
import { PgNestBaseRepository, format } from '@spotmetrics/orm-lib/lib'
import { DegreeKinshipModel } from '../models/degree-kinship-model'

@Injectable()
export class PgDegreeKinshipRepository
  extends PgNestBaseRepository<DegreeKinshipModel>
  implements DegreeKinshipRepository
{
  protected tableName(): string {
    return 'degreekinship'
  }

  async findById(id: number): Promise<DegreeKinshipModel | null> {
    return await this.CRUD.findOne({
      id_degreekinship: id,
    })
  }

  async findMany(input: {
    limit?: number
    order?: 'DESC' | 'ASC'
    page?: number
    sortBy?: string
  }): Promise<{ id: number; name: string; total: number }[]> {
    const limit = input.limit || 100
    return await this.pg.runQuery(
      format(`
        WITH result AS (
          SELECT *
          FROM degreekinship
          ORDER BY ${
            input.sortBy ?? 'nme_degreekinship '.concat(input.order ?? 'ASC')
          }
        )
        SELECT
          result.*,
          COUNT(*) OVER () AS total
        FROM
          result
        LIMIT limit
        OFFSET ${
          input.page ? (input.page > 0 ? (input?.page - 1) * limit : 0) : 0
        }`),
    )
  }
}
