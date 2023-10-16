import { Entity } from '@/core/entities/entity'

interface CustomerProps {
  fullName?: string | null
  birthDate?: Date | null
  cpf?: string | null
  commercialPhone?: string | null
  homePhone?: string | null
  mobileNumber?: string | null
  email?: string | null
  registerDate: Date
  lastUpdate?: Date | null
  company?: string | null
  income?: number | null
  observation?: string | null
  active: boolean
  genre?: string | null
  blocked: boolean
  password?: string
  isComplete?: boolean | null
  creatorEmployeeId: number
  updaterEmployeeId?: number | null
  personaId: number
  mallOriginId: number
  mallId: number
  emailValid?: boolean | null
  loyaltyWalletId?: string | null
  loyaltyWalletPin?: string | null
  moneriId?: number | null
  paymentCode?: string | null
  loyaltyBlocked?: boolean | null
  externalCustomerCode?: string | null
  externalCustomerCompanyCode?: string | null
}

export class Customer extends Entity<CustomerProps> {
  // private touch() {
  //   this.props.lastUpdate = new Date()
  // }

  static create(
    props: Omit<
      CustomerProps,
      'loyaltyBlocked' | 'blocked' | 'registerDate' | 'active' | 'emailValid'
    >,
  ) {
    return new Customer({
      ...props,
      active: true,
      blocked: false,
      loyaltyBlocked: false,
      registerDate: new Date(),
      password: props.password ?? '',
      isComplete: true,
      emailValid: !!props.email,
    })
  }

  static restore(props: CustomerProps, id: number) {
    return new Customer(
      {
        ...props,
      },
      id,
    )
  }
}
