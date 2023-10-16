import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('[E2E] create dependent', () => {
  let app: INestApplication
  // let pg: PgNestDatabaseService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    // pg = moduleRef.get(PgNestDatabaseService)
    await app.init()
  })

  test('[POST] /dependent', async () => {
    const response = await request(app.getHttpServer())
      .post('customers/dependents')
      .send({
        responsibleId: 1777,
        dependents: [
          {
            name: 'John Doe Jr',
            birthDate: '2019-02-05',
            genre: 'O',
            degreekinshipId: 2,
          },
        ],
      })
    expect(response.status).toBe(204)
  })
})
