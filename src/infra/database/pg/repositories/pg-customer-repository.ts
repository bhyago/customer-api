import { CustomerRepository } from '@/application/gateway-contracts/repositories/customer'
import { Customer } from '@/domain/entities/customer'
import { Injectable } from '@nestjs/common'
import { PgNestBaseRepository } from '@spotmetrics/orm-lib/lib'
import { PgCustomerMapper } from '../mappers/pg-customer-mappers'
import { CustomerModel } from '../models/customer-model'

@Injectable()
export class PgCustomerRepository
  extends PgNestBaseRepository<CustomerModel>
  implements CustomerRepository
{
  async save(input: Customer): Promise<Customer> {
    const newCustomer = await this.CRUD.create(PgCustomerMapper.toPg(input))
    return PgCustomerMapper.toDomain(newCustomer)
  }

  update(input: Customer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(input: {
    id: number
    mallId: number
  }): Promise<Customer | null> {
    const customer = await this.CRUD.findOne({
      id: input.id,
      id_mall: input.mallId,
    })

    if (!customer) {
      return null
    }

    return PgCustomerMapper.toDomain(customer)
  }

  protected tableName(): string {
    return 'client'
  }
}
