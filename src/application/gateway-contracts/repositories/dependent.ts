import { Dependent } from '@/domain/entities/dependent'

export abstract class DependentRepository {
  abstract save(input: Dependent): Promise<void>
  abstract findAssociationBetweenCustomer(input: {
    responsibleId: number
    dependentId: number
  }): Promise<Dependent | null>
}
