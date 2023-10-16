import { Customer } from '@/domain/entities/customer'
import { Dependent } from '@/domain/entities/dependent'
import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../gateway-contracts/repositories/customer'
import { DegreeKinshipRepository } from '../gateway-contracts/repositories/degree-kinship'
import { DependentRepository } from '../gateway-contracts/repositories/dependent'
import { MallOriginRepository } from '../gateway-contracts/repositories/mall-origin-repository'
import { CustomerDependentNotFoundError } from './errors/customer-dependent-not-found-error'
import { DependencyDegreeNotFoundError } from './errors/dependency-degree-not-found-error'
import { InvalidOriginError } from './errors/invalid-origin-error'
import { KinshipAlreadyRegisteredError } from './errors/kinship-already-register-error'
import { KinshipNotFoundError } from './errors/kinship-not-found-error'
import { MissingResponsibleContactInfoError } from './errors/missing-responsible-contact-info'
import { ResponsibleNotFoundError } from './errors/responsible-not-found'
import { SimultaneousDependentResponsibleError } from './errors/simultaneous-dependent-responsible-error'

export interface CreateDependentRequest {
  responsibleId: number
  originId: number
  dependents: {
    id?: number
    name?: string
    birthDate?: Date
    genre?: 'M' | 'F' | 'O'
    degreekinshipId: number
  }[]
  mallId: number
  employeeId: number
}
type CreateDependentResponde = void

@Injectable()
export class CreateDependentUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly dependentRepository: DependentRepository,
    private readonly degreeKinshipRepository: DegreeKinshipRepository,
    private readonly mallOriginRepository: MallOriginRepository,
  ) {}

  async execute(
    input: CreateDependentRequest,
  ): Promise<CreateDependentResponde> {
    const findConcurrentCustomers = input.dependents.find(
      (item) => item.id === input.responsibleId,
    )

    if (findConcurrentCustomers) {
      throw new SimultaneousDependentResponsibleError()
    }

    const responsibleExists = await this.customerRepository.findById({
      id: input.responsibleId,
      mallId: input.mallId,
    })

    if (!responsibleExists) {
      throw new ResponsibleNotFoundError()
    }

    if (
      !responsibleExists.props.mobileNumber &&
      !responsibleExists.props.email
    ) {
      throw new MissingResponsibleContactInfoError()
    }

    const newCustomer = input.dependents.filter((dependent) => {
      return dependent?.id === undefined || null
    })

    const newAssociations = input.dependents.filter((dependent) => {
      return dependent?.id !== undefined && typeof dependent?.id === 'number'
    })

    if (newAssociations) {
      for (const dependent of newAssociations) {
        const customerDependentExists = await this.customerRepository.findById({
          id: dependent.id!,
          mallId: input.mallId,
        })
        if (!customerDependentExists) {
          throw new CustomerDependentNotFoundError()
        }

        const dependentKinshipAlreadyExists =
          await this.dependentRepository.findAssociationBetweenCustomer({
            dependentId: dependent.id!,
            responsibleId: input.responsibleId,
          })

        if (dependentKinshipAlreadyExists?.id) {
          throw new KinshipAlreadyRegisteredError()
        }

        const degreeKinshipExists = await this.degreeKinshipRepository.findById(
          dependent.degreekinshipId,
        )

        if (!degreeKinshipExists) {
          throw new KinshipNotFoundError(
            dependent.name || customerDependentExists.props.fullName!,
          )
        }

        const createDependency = Dependent.create({
          degreekinshipId: dependent.degreekinshipId,
          dependentId: dependent.id!,
          responsibleId: input.responsibleId,
        })

        await this.dependentRepository.save(createDependency)
      }
    }

    if (newCustomer) {
      for (const dependent of newCustomer) {
        const degreeKinship = await this.degreeKinshipRepository.findById(
          dependent.degreekinshipId,
        )

        if (!degreeKinship) {
          throw new DependencyDegreeNotFoundError(dependent.name!)
        }

        const mallOrigin = await this.mallOriginRepository.findMallOriginById({
          mallId: input.mallId,
          originId: input.originId,
        })

        if (!mallOrigin) {
          throw new InvalidOriginError()
        }

        const createCustomer = await Customer.create({
          fullName: dependent.name!,
          email: responsibleExists?.props.email,
          birthDate: dependent.birthDate ? new Date(dependent.birthDate) : null,
          mobileNumber: responsibleExists?.props.mobileNumber,
          genre: dependent?.genre,
          mallOriginId: mallOrigin.id_mallorign,
          mallId: input.mallId,
          creatorEmployeeId: input.employeeId,
          // TODO - atualizar persona
          personaId: 1,
        })

        const created = await this.customerRepository.save(createCustomer)
        const createDependency = Dependent.create({
          degreekinshipId: dependent.degreekinshipId,
          dependentId: created.id!,
          responsibleId: input.responsibleId,
        })

        await this.dependentRepository.save(createDependency)
      }
    }
  }
}
