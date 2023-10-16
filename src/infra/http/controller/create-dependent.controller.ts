import { CreateDependentUseCase } from '@/application/use-cases/create-dependent'
import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'

const createDependentQuerySchema = z.object({ mallId: z.coerce.number() })
const createDependentBodySchema = z.object({
  responsibleId: z.number().int().positive(),
  originId: z.number().int().positive(),
  dependents: z.array(
    z
      .object({
        id: z.number().int().min(1).optional(),
        name: z.string().max(200).optional(),
        birthDate: z.coerce.date().optional(),
        genre: z.enum(['M', 'F', 'O']).optional(),
        // TODO - degreekinshipId deve ser opcional ? ver no front
        degreekinshipId: z.number().int().positive(),
      })
      .refine(
        (data) => {
          // Check if either "id" is present or both "name" and "degreekinshipId" are present
          return (
            data.id != null ||
            (data.name != null && data.degreekinshipId != null)
          )
        },
        {
          message:
            "Either 'id' must be present, or both 'name' and 'degreekinshipId' must be present",
        },
      ),
  ),
})

type CreateDependentBodyDto = z.infer<typeof createDependentBodySchema>
type CreateDependentQueryDto = z.infer<typeof createDependentQuerySchema>

@Controller('customers/dependents')
export class CreateDependentController {
  constructor(readonly createDependent: CreateDependentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createDependentBodySchema))
  async handle(
    @Body() body: CreateDependentBodyDto,
    @Query() query: CreateDependentQueryDto,
  ) {
    const { dependents, originId, responsibleId } =
      createDependentBodySchema.parse(body)
    const { mallId } = query

    await this.createDependent.execute({
      dependents,
      employeeId: 1000,
      mallId,
      originId,
      responsibleId,
    })
  }
}
