import { AggregateRoot } from './aggregate-root';

export interface IRepository<E extends AggregateRoot> {
  add(aggregate: E): Promise<void>;
  findById(id: any): Promise<E | null>;
  findAll(): Promise<E[]>;
  delete(aggregate: E): Promise<void>;
}
