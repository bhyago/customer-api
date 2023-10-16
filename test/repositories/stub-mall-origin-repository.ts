import { MallOriginRepository } from '@/application/gateway-contracts/repositories/mall-origin-repository'

export class StubMallOriginRepository implements MallOriginRepository {
  findMallOriginById = vi.fn()
}
