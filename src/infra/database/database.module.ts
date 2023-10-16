import { Module } from '@nestjs/common'
import { PgNestDatabaseService } from '@spotmetrics/orm-lib/lib'

import { CustomerRepository } from '@/application/gateway-contracts/repositories/customer'
import { DegreeKinshipRepository } from '@/application/gateway-contracts/repositories/degree-kinship'
import { DependentRepository } from '@/application/gateway-contracts/repositories/dependent'
import { MallOriginRepository } from '@/application/gateway-contracts/repositories/mall-origin-repository'
import { MallRepository } from '@/application/gateway-contracts/repositories/mall-repository'

import { PgDependentRepository } from './pg/repositories/pg-customer-dependency-repository'
import { PgCustomerRepository } from './pg/repositories/pg-customer-repository'
import { PgDegreeKinshipRepository } from './pg/repositories/pg-degree-kinship-repository'
import { PgMallOriginRepository } from './pg/repositories/pg-mall-origin-repository'
import { PgMallRepository } from './pg/repositories/pg-mall-repository'

@Module({
  providers: [
    PgNestDatabaseService,
    {
      provide: DependentRepository,
      useClass: PgDependentRepository,
    },
    {
      provide: MallRepository,
      useClass: PgMallRepository,
    },
    {
      provide: CustomerRepository,
      useClass: PgCustomerRepository,
    },
    {
      provide: DegreeKinshipRepository,
      useClass: PgDegreeKinshipRepository,
    },
    {
      provide: MallOriginRepository,
      useClass: PgMallOriginRepository,
    },
  ],
  exports: [
    PgNestDatabaseService,
    DependentRepository,
    MallRepository,
    CustomerRepository,
    DegreeKinshipRepository,
    MallOriginRepository,
  ],
})
export class DatabaseModule {}
