import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../gateway-contracts/repositories/customer';

@Injectable()
export class GetDependentById {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: { customerId: number; mallId: number }): Promise<any> {
    const customer = await this.customerRepository.findById({
      mallId: data.mallId,
      id: data.customerId,
    })

    return customer
  }
}
