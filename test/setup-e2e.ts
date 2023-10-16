import { exec } from 'child_process'
import { config } from 'dotenv'
import { promisify } from 'util'

beforeAll(async () => {
  const up = 'test/seeds/up'
  config({ path: '../../.env.test' })
  const execAsync = promisify(exec)
  try {
    await execAsync(`sh ${up}/up.sh ${process.env.DATABASE_URL}`)
  } catch (error) {
    console.error('Erro ao executar o arquivo up.sh:', error)
  }
})

afterAll(async () => {
  const down = 'test/seeds/down'
  config({ path: '.env.test' })
  const execAsync = promisify(exec)
  try {
    await execAsync(`sh ${down}/down.sh ${process.env.DATABASE_URL}`)
  } catch (error) {
    console.error('Erro ao executar o arquivo down.sh:', error)
  }
})
