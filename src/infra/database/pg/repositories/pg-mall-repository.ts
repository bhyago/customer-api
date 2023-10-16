import { MallRepository } from '@/application/gateway-contracts/repositories/mall-repository'
import { Injectable } from '@nestjs/common'
import { PgNestBaseRepository } from '@spotmetrics/orm-lib/lib'

@Injectable()
export class PgMallRepository
  extends PgNestBaseRepository<any>
  implements MallRepository
{
  protected tableName(): string {
    return 'mall'
  }

  qryLgpd(mallId: number): Promise<{ qry_lgpd: string } | null> {
    throw new Error('Method not implemented.')
  }
}
