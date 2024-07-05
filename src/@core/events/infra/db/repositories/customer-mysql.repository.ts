import { EntityManager } from '@mikro-orm/mysql';
import {
  Customer,
  CustomerId,
} from 'src/@core/events/domain/entities/customer.entity';
import { ICustomerRepository } from 'src/@core/events/domain/repositories/customer-repository.interface';

export class CustomerMysqlRepository implements ICustomerRepository {
  constructor(private entityManager: EntityManager) {}
  async add(aggregate: Customer): Promise<void> {
    this.entityManager.persist(aggregate);
  }
  async findById(id: any): Promise<Customer | null> {
    return this.entityManager.findOne(Customer, {
      id: typeof id === 'string' ? new CustomerId(id) : id,
    });
  }
  async findAll(): Promise<Customer[]> {
    return this.entityManager.find(Customer, {});
  }
  async delete(aggregate: Customer): Promise<void> {
    this.entityManager.remove(aggregate);
  }
}
