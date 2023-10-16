import { DegreeKinshipRepository } from '@/application/gateway-contracts/repositories/degree-kinship'

export class StubDegreeKinshipRepository implements DegreeKinshipRepository {
  findById = vi.fn()
  findMany = vi.fn()
}
