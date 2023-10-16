import { MallRepository } from '@/application/gateway-contracts/repositories/mall-repository'

export class StubMallRepository implements MallRepository {
  qryLgpd = vi.fn()
  findMallOriginById = vi.fn()
}
