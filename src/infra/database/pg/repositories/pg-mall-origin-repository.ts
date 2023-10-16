import { MallOriginRepository } from '@/application/gateway-contracts/repositories/mall-origin-repository'
import { Injectable } from '@nestjs/common'
import { PgNestBaseRepository } from '@spotmetrics/orm-lib/lib'
import { MallOriginModel } from '../models/mall-origin-model'

@Injectable()
export class PgMallOriginRepository
  extends PgNestBaseRepository<MallOriginModel>
  implements MallOriginRepository
{
  async findMallOriginById(input: {
    mallId: number
    originId: number
  }): Promise<{ id_mallorign: number } | null> {
    return await this.CRUD.findOne({
      id_mall: input.mallId,
      id_orign: input.originId,
      flg_active: true,
    })
  }

  protected tableName(): string {
    return 'mallorign'
  }
}
