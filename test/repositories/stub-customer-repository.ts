import { CustomerRepository } from '@/application/gateway-contracts/repositories/customer'

export class StubCustomerRepository implements CustomerRepository {
  save = vi.fn()
  update = vi.fn()
  findById = vi.fn()
  findByIdAndMallId = vi.fn()
}
