import { Customer } from '@/domain/entities/customer'
import { StubCustomerRepository } from 'test/repositories/stub-customer-repository'
import { StubDegreeKinshipRepository } from 'test/repositories/stub-degree-kinship-repository'
import { StubDependentRepository } from 'test/repositories/stub-dependent-repository'
import { StubMallOriginRepository } from 'test/repositories/stub-mall-origin-repository'
import { CustomerRepository } from '../gateway-contracts/repositories/customer'
import { DegreeKinshipRepository } from '../gateway-contracts/repositories/degree-kinship'
import { DependentRepository } from '../gateway-contracts/repositories/dependent'
import { MallOriginRepository } from '../gateway-contracts/repositories/mall-origin-repository'
import {
  CreateDependentRequest,
  CreateDependentUseCase,
} from './create-dependent'
import { CustomerDependentNotFoundError } from './errors/customer-dependent-not-found-error'
import { DependencyDegreeNotFoundError } from './errors/dependency-degree-not-found-error'
import { InvalidOriginError } from './errors/invalid-origin-error'
import { KinshipAlreadyRegisteredError } from './errors/kinship-already-register-error'
import { KinshipNotFoundError } from './errors/kinship-not-found-error'
import { MissingResponsibleContactInfoError } from './errors/missing-responsible-contact-info'
import { ResponsibleNotFoundError } from './errors/responsible-not-found'
import { SimultaneousDependentResponsibleError } from './errors/simultaneous-dependent-responsible-error'

describe('[use case]: create dependent', () => {
  let sut: CreateDependentUseCase
  let customerRepository: CustomerRepository
  let dependentRepository: DependentRepository
  let degreeKinshipRepository: DegreeKinshipRepository
  let mallOriginRepository: MallOriginRepository

  beforeEach(() => {
    customerRepository = new StubCustomerRepository()
    dependentRepository = new StubDependentRepository()
    degreeKinshipRepository = new StubDegreeKinshipRepository()
    mallOriginRepository = new StubMallOriginRepository()
    sut = new CreateDependentUseCase(
      customerRepository,
      dependentRepository,
      degreeKinshipRepository,
      mallOriginRepository,
    )
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should thorow SimultaneousDependentResponsibleError', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 28,
      employeeId: 1000,
      dependents: [
        {
          id: 400,
          degreekinshipId: 1,
        },
      ],
    }

    await expect(sut.execute(REQUEST)).rejects.toThrow(
      SimultaneousDependentResponsibleError,
    )
  })

  it('should throw ResponsibleNotFoundError when the responsible person for some family members does not exist.', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 28,
      employeeId: 1000,
      dependents: [
        {
          birthDate: new Date('2021-05-31'),
          name: 'John Doe',
          degreekinshipId: 1,
          genre: 'M',
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById').mockResolvedValueOnce(null)

    await expect(sut.execute(REQUEST)).rejects.toThrow(ResponsibleNotFoundError)
    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })
  })

  it('should throw MissingResponsibleContactInfoError when no mobile_number and email exists for the responsible', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      originId: 4,
      responsibleId: 400,
      employeeId: 1000,
      dependents: [
        {
          name: 'John Doe Jr',
          birthDate: new Date('2021-05-31'),
          degreekinshipId: 1,
          genre: 'M',
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById').mockResolvedValueOnce({
      id: 400,
      props: {
        email: null,
        mobileNumber: null,
        fullName: 'John Doe',
        personaId: 1,
        active: true,
        blocked: false,
        creatorEmployeeId: 1000,
        mallId: 5,
        mallOriginId: 4,
        registerDate: new Date(),
      },
    })

    await expect(sut.execute(REQUEST)).rejects.toThrow(
      MissingResponsibleContactInfoError,
    )

    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })
  })

  it('should throw CustomerDependentNotFoundError when dependent does not exist', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 45,
      employeeId: 1000,
      dependents: [
        {
          id: 40,
          degreekinshipId: 3,
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById')
      .mockResolvedValueOnce({
        id: 400,
        props: {
          email: 'johndoe@email.com',
          fullName: 'John Doe',
          mobileNumber: '2199345670',
          personaId: 1,
          active: true,
          blocked: false,
          creatorEmployeeId: 1000,
          mallId: 5,
          mallOriginId: 4,
          registerDate: new Date(),
        },
      })
      .mockResolvedValueOnce(null)

    await expect(sut.execute(REQUEST)).rejects.toThrow(
      CustomerDependentNotFoundError,
    )
    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })
  })

  it('should throw KinshipAlreadyRegisteredError when kinship already exists', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 45,
      employeeId: 1000,
      dependents: [
        {
          id: 40,
          degreekinshipId: 1,
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById')
      .mockResolvedValueOnce({
        id: 400,
        props: {
          email: 'johndoe@email.com',
          fullName: 'John Doe',
          mobileNumber: '2199345670',
          personaId: 1,
          active: true,
          blocked: false,
          creatorEmployeeId: 1000,
          mallId: 5,
          mallOriginId: 4,
          registerDate: new Date(),
        },
      })
      .mockResolvedValueOnce({
        id: 40,
        props: {
          email: 'johndoe@email.com',
          fullName: 'John Doe 2',
          mobileNumber: '2199345670',
          personaId: 1,
          active: true,
          blocked: false,
          creatorEmployeeId: 1000,
          mallId: 5,
          mallOriginId: 4,
          registerDate: new Date(),
        },
      })

    vi.spyOn(
      dependentRepository,
      'findAssociationBetweenCustomer',
    ).mockResolvedValueOnce({
      id: 34,
      props: {
        degreekinshipId: 1,
        responsibleId: 40,
        dependentId: 400,
        active: true,
      },
    })

    await expect(sut.execute(REQUEST)).rejects.toThrow(
      KinshipAlreadyRegisteredError,
    )

    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })
  })

  it('should throw KinshipNotFoundError when kinship does not exist', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 4,
      employeeId: 1000,
      dependents: [
        {
          id: 40,
          degreekinshipId: 6,
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById')
      .mockResolvedValueOnce({
        id: 400,
        props: {
          email: 'johndoe@email.com',
          fullName: 'John Doe',
          mobileNumber: '2199345670',
          personaId: 1,
          active: true,
          blocked: false,
          creatorEmployeeId: 1000,
          mallId: 5,
          mallOriginId: 4,
          registerDate: new Date(),
        },
      })
      .mockResolvedValueOnce({
        id: 40,
        props: {
          email: 'johndoe@email.com',
          fullName: 'John Doe 2',
          mobileNumber: '2199345670',
          personaId: 1,
          active: true,
          blocked: false,
          creatorEmployeeId: 1000,
          mallId: 5,
          mallOriginId: 4,
          registerDate: new Date(),
        },
      })

    vi.spyOn(
      dependentRepository,
      'findAssociationBetweenCustomer',
    ).mockResolvedValueOnce(null)
    vi.spyOn(degreeKinshipRepository, 'findById').mockResolvedValueOnce(null)

    await expect(sut.execute(REQUEST)).rejects.toThrow(KinshipNotFoundError)

    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })
    expect(
      dependentRepository.findAssociationBetweenCustomer,
    ).toHaveBeenCalledWith({
      responsibleId: REQUEST.responsibleId,
      dependentId: REQUEST.dependents[0].id,
    })
    expect(degreeKinshipRepository.findById).toHaveBeenCalledWith(
      REQUEST.dependents[0].degreekinshipId,
    )
  })

  it('should create customer dependent correctly when new associations are valid', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      originId: 4,
      responsibleId: 400,
      employeeId: 1000,
      dependents: [
        {
          id: 40,
          degreekinshipId: 1,
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById')
      .mockResolvedValueOnce({
        id: 400,
        props: {
          email: 'johndoe@email.com',
          fullName: 'John Doe',
          mobileNumber: '2199345670',
          personaId: 1,
          active: true,
          blocked: false,
          creatorEmployeeId: 1000,
          mallId: 5,
          mallOriginId: 4,
          registerDate: new Date(),
        },
      })
      .mockResolvedValueOnce({
        id: 40,
        props: {
          email: 'johndoe@email.com',
          fullName: 'John Doe 2',
          mobileNumber: '2199345670',
          personaId: 1,
          active: true,
          blocked: false,
          creatorEmployeeId: 1000,
          mallId: 5,
          mallOriginId: 4,
          registerDate: new Date(),
        },
      })
    vi.spyOn(
      dependentRepository,
      'findAssociationBetweenCustomer',
    ).mockResolvedValueOnce(null)
    vi.spyOn(degreeKinshipRepository, 'findById').mockResolvedValueOnce({
      id_degreekinship: 1,
      nme_degreekinship: 'FILHO(A)',
    })

    await expect(sut.execute(REQUEST)).resolves.toBe(undefined)
    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })
    expect(dependentRepository.save).toHaveBeenCalledWith({
      id: undefined,
      props: {
        responsibleId: REQUEST.responsibleId,
        dependentId: REQUEST.dependents[0].id,
        degreekinshipId: REQUEST.dependents[0].degreekinshipId,
        active: true,
      },
    })

    expect(degreeKinshipRepository.findById).toHaveBeenCalledWith(
      REQUEST.dependents[0].degreekinshipId,
    )
  })

  it('should throw DependencyDegreeNotFoundError when degree of kinship does not exist', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      originId: 4,
      responsibleId: 400,
      employeeId: 1000,
      dependents: [
        {
          birthDate: new Date('1996-05-09'),
          degreekinshipId: 1,
          genre: 'O',
          name: 'John doe',
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById').mockResolvedValueOnce({
      id: 400,
      props: {
        email: 'johndoe@email.com',
        fullName: 'John Doe',
        mobileNumber: '2199345670',
        personaId: 1,
        active: true,
        blocked: false,
        creatorEmployeeId: 1000,
        mallId: 5,
        mallOriginId: 4,
        registerDate: new Date(),
      },
    })

    vi.spyOn(degreeKinshipRepository, 'findById').mockResolvedValueOnce(null)
    await expect(sut.execute(REQUEST)).rejects.toThrow(
      DependencyDegreeNotFoundError,
    )

    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })

    expect(degreeKinshipRepository.findById).toHaveBeenCalledWith(
      REQUEST.dependents[0].degreekinshipId,
    )
  })

  it('should throw InvalidOriginError when mall origin is null', async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 1,
      employeeId: 1000,
      dependents: [
        {
          birthDate: new Date('1996-05-09'),
          degreekinshipId: 1,
          genre: 'O',
          name: 'John doe',
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById').mockResolvedValueOnce({
      id: 400,
      props: {
        email: 'johndoe@email.com',
        fullName: 'John Doe',
        mobileNumber: '2199345670',
        personaId: 1,
        active: true,
        blocked: false,
        creatorEmployeeId: 1000,
        mallId: 5,
        mallOriginId: 4,
        registerDate: new Date(),
      },
    })

    vi.spyOn(degreeKinshipRepository, 'findById').mockResolvedValueOnce({
      id_degreekinship: 1,
      nme_degreekinship: 'FILHO(A)',
    })

    vi.spyOn(mallOriginRepository, 'findMallOriginById').mockResolvedValueOnce(
      null,
    )
    await expect(sut.execute(REQUEST)).rejects.toThrow(InvalidOriginError)

    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })

    expect(degreeKinshipRepository.findById).toHaveBeenCalledWith(
      REQUEST.dependents[0].degreekinshipId,
    )

    expect(mallOriginRepository.findMallOriginById).toHaveBeenCalledWith({
      mallId: REQUEST.mallId,
      originId: REQUEST.originId,
    })
  })

  it("should create the dependent client correctly without the responsible person's email and without the dependent's birthday", async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 1,
      employeeId: 1000,
      dependents: [
        {
          degreekinshipId: 1,
          genre: 'O',
          name: 'John doe',
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById').mockResolvedValueOnce({
      id: 400,
      props: {
        email: null,
        fullName: 'John Doe',
        mobileNumber: '2199345670',
        personaId: 1,
        active: true,
        blocked: false,
        creatorEmployeeId: 1000,
        mallId: 5,
        mallOriginId: 4,
        registerDate: new Date(),
      },
    })

    vi.spyOn(degreeKinshipRepository, 'findById').mockResolvedValueOnce({
      id_degreekinship: 1,
      nme_degreekinship: 'FILHO(A)',
    })

    vi.spyOn(mallOriginRepository, 'findMallOriginById').mockResolvedValueOnce({
      id_mallorign: 1,
    })

    vi.spyOn(Customer, 'create').mockResolvedValueOnce({
      id: undefined,
      props: {
        fullName: 'John doe',
        email: null,
        birthDate: null,
        mobileNumber: '2199345670',
        genre: 'O',
        mallOriginId: 1,
        mallId: 5,
        creatorEmployeeId: 1000,
        personaId: 1,
        active: true,
        blocked: false,
        loyaltyBlocked: false,
        registerDate: new Date('2023-10-14'),
        emailValid: null,
      },
    })

    vi.spyOn(customerRepository, 'save').mockResolvedValueOnce({
      id: 4001,
      props: {
        fullName: 'John doe',
        email: null,
        birthDate: null,
        mobileNumber: '2199345670',
        genre: 'O',
        mallOriginId: 1,
        mallId: 5,
        creatorEmployeeId: 1000,
        personaId: 1,
        active: true,
        blocked: false,
        loyaltyBlocked: false,
        registerDate: new Date('2023-10-14'),
        emailValid: null,
      },
    })

    await expect(sut.execute(REQUEST)).resolves.toBe(undefined)
    expect(customerRepository.save).toHaveBeenCalledWith({
      id: undefined,
      props: {
        fullName: 'John doe',
        email: null,
        birthDate: null,
        mobileNumber: '2199345670',
        genre: 'O',
        personaId: 1,
        creatorEmployeeId: 1000,
        mallOriginId: 1,
        mallId: 5,
        active: true,
        emailValid: null,
        loyaltyBlocked: false,
        registerDate: new Date('2023-10-14'),
        blocked: false,
      },
    })

    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })

    expect(degreeKinshipRepository.findById).toHaveBeenCalledWith(
      REQUEST.dependents[0].degreekinshipId,
    )

    expect(mallOriginRepository.findMallOriginById).toHaveBeenCalledWith({
      mallId: REQUEST.mallId,
      originId: REQUEST.originId,
    })
  })

  it("should create the dependent client correctly without the responsible person's mobile_number", async () => {
    const REQUEST: CreateDependentRequest = {
      mallId: 5,
      responsibleId: 400,
      originId: 1,
      employeeId: 1000,
      dependents: [
        {
          degreekinshipId: 1,
          genre: 'O',
          name: 'John doe',
          birthDate: new Date('2005-08-09'),
        },
      ],
    }

    vi.spyOn(customerRepository, 'findById').mockResolvedValueOnce({
      id: 400,
      props: {
        email: 'johndoe@email.com',
        fullName: 'John Doe',
        mobileNumber: null,
        personaId: 1,
        active: true,
        blocked: false,
        creatorEmployeeId: 1000,
        mallId: 5,
        mallOriginId: 4,
        registerDate: new Date(),
      },
    })

    vi.spyOn(Customer, 'create').mockResolvedValueOnce({
      id: undefined,
      props: {
        fullName: 'John doe',
        email: 'johndoe@email.com',
        birthDate: new Date('2005-08-09'),
        mobileNumber: null,
        genre: 'O',
        mallOriginId: 1,
        mallId: 5,
        creatorEmployeeId: 1000,
        personaId: 1,
        active: true,
        blocked: false,
        loyaltyBlocked: false,
        registerDate: new Date('2023-10-14'),
        emailValid: true,
      },
    })

    vi.spyOn(customerRepository, 'save').mockResolvedValueOnce({
      id: 4001,
      props: {
        fullName: 'John doe',
        email: 'johndoe@email.com',
        birthDate: new Date('2005-08-09'),
        mobileNumber: null,
        genre: 'O',
        mallOriginId: 1,
        mallId: 5,
        creatorEmployeeId: 1000,
        personaId: 1,
        active: true,
        blocked: false,
        loyaltyBlocked: false,
        registerDate: new Date('2023-10-14'),
        emailValid: true,
      },
    })

    vi.spyOn(degreeKinshipRepository, 'findById').mockResolvedValueOnce({
      id_degreekinship: 1,
      nme_degreekinship: 'FILHO(A)',
    })

    vi.spyOn(mallOriginRepository, 'findMallOriginById').mockResolvedValueOnce({
      id_mallorign: 1,
    })

    await expect(sut.execute(REQUEST)).resolves.toBe(undefined)

    expect(customerRepository.save).toHaveBeenCalledWith({
      id: undefined,
      props: {
        fullName: 'John doe',
        email: 'johndoe@email.com',
        birthDate: new Date('2005-08-09'),
        mobileNumber: null,
        genre: 'O',
        mallOriginId: 1,
        mallId: 5,
        creatorEmployeeId: 1000,
        personaId: 1,
        active: true,
        blocked: false,
        loyaltyBlocked: false,
        registerDate: new Date('2023-10-14'),
        emailValid: true,
      },
    })

    expect(dependentRepository.save).toHaveBeenCalledWith({
      id: undefined,
      props: {
        degreekinshipId: 1,
        dependentId: 4001,
        responsibleId: 400,
        active: true,
      },
    })

    expect(customerRepository.findById).toHaveBeenCalledWith({
      id: REQUEST.responsibleId,
      mallId: REQUEST.mallId,
    })
    expect(degreeKinshipRepository.findById).toHaveBeenCalledWith(
      REQUEST.dependents[0].degreekinshipId,
    )
    expect(mallOriginRepository.findMallOriginById).toHaveBeenCalledWith({
      mallId: REQUEST.mallId,
      originId: REQUEST.originId,
    })
  })
})
