import { Customer } from '@/domain/entities/customer'

export abstract class CustomerRepository {
  abstract save(input: Customer): Promise<Customer>
  abstract update(input: Customer): Promise<void>
  abstract findById(input: {
    id: number
    mallId: number
  }): Promise<Customer | null>
}
