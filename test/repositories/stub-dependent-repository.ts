import { DependentRepository } from '@/application/gateway-contracts/repositories/dependent'

export class StubDependentRepository implements DependentRepository {
  findAssociationBetweenCustomer = vi.fn()
  save = vi.fn()
}
