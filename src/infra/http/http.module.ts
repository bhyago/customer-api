import { CreateDependentUseCase } from '@/application/use-cases/create-dependent'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateDependentController } from './controller/create-dependent.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateDependentController],
  providers: [CreateDependentUseCase],
})
export class HttpModule {}
