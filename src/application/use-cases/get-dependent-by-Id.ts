// import { Injectable } from '@nestjs/common'

// interface Input {
//   mallId: number
//   responsibleId: number
//   dependentId: number
// }

// interface OutPut {
//   responsibleId: number
//   dependent: {
//     id?: number
//     birthDate?: Date
//     genre?: string
//     name?: string
//     degreekinship: {
//       id: number
//       name: string
//     }
//   }
// }

// @Injectable()
// export class GetDependentById {
//   constructor(private readonly dependentRepository: DependentRepository) {}

//   async execute(data: Input): Promise<OutPut> {
//     const customerDependent = await this.customerDependentRepository.findById({
//       mallId: data.mallId,
//       responsibleId: data.responsibleId,
//       dependentId: data.dependentId,
//     })

//     if (!customerDependent) {
//       throw new ResponsableOrDependentNotFoundError()
//     }
//   }
// }
