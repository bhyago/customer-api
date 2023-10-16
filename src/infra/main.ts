import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'
import { WinstonLogger } from './logger/winston.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/mos/v1/customer-management')
  app.useLogger(new WinstonLogger())

  const env = app.get(EnvService)
  await app.listen(env.get('PORT'))
}
bootstrap()
