import { DependentRepository } from '@/application/gateway-contracts/repositories/dependent'
import { Dependent } from '@/domain/entities/dependent'
import { Injectable } from '@nestjs/common'
import { PgNestBaseRepository } from '@spotmetrics/orm-lib/lib'
import { PgCustomerDependencyMapper } from '../mappers/pg-customer-dependency-mappers'
import { CustomerDependencyModel } from '../models/customer-dependency-model'

@Injectable()
export class PgDependentRepository
  extends PgNestBaseRepository<CustomerDependencyModel>
  implements DependentRepository
{
  async save(input: Dependent): Promise<void> {
    await this.CRUD.create(PgCustomerDependencyMapper.toPg(input))
  }

  async findAssociationBetweenCustomer(input: {
    responsibleId: number
    dependentId: number
  }): Promise<Dependent | null> {
    const result = await this.CRUD.findOne({
      id_clientdependency: input.dependentId,
      id_clientresponsable: input.responsibleId,
    })

    if (!result) {
      return null
    }

    return PgCustomerDependencyMapper.toDomain(result)
  }

  protected tableName(): string {
    return 'clientdependecy'
  }
}
