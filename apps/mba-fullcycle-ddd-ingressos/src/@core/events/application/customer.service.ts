import { IUnitOfWork } from '../../common/application/unit-of-work.interface';
import { Customer } from '../domain/entities/customer.entity';
import { ICustomerRepository } from '../domain/repositories/customer-repository.interface';

export type RegisterCustomerDTO = {
  name: string;
  cpf: string;
};

export class CustomerService {
  constructor(
    private customerRepo: ICustomerRepository,
    private uow: IUnitOfWork,
  ) {}

  list() {
    return this.customerRepo.findAll();
  }

  async create(input: RegisterCustomerDTO) {
    const customer = Customer.create(input);
    this.customerRepo.add(customer);
    await this.uow.commit();
    return customer;
  }

  async update(id: string, input: { name?: string }) {
    const customer = await this.customerRepo.findById(id);

    if (!customer) {
      throw new Error('Customer not found');
    }

    input.name && customer.changeName(input.name);

    this.customerRepo.add(customer);
    await this.uow.commit();

    return customer;
  }
}
