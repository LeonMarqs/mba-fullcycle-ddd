import { EntityManager } from '@mikro-orm/mysql';
import { Event, EventId } from 'src/@core/events/domain/entities/event.entity';
import { IEventRepository } from 'src/@core/events/domain/repositories/event-repository.interface';

export class EventMysqlRepository implements IEventRepository {
  constructor(private entityManager: EntityManager) {}
  async add(aggregate: Event): Promise<void> {
    this.entityManager.persist(aggregate);
  }
  async findById(id: any): Promise<Event | null> {
    return this.entityManager.findOne(Event, {
      id: typeof id === 'string' ? new EventId(id) : id,
    });
  }
  async findAll(): Promise<Event[]> {
    return this.entityManager.find(Event, {});
  }
  async delete(aggregate: Event): Promise<void> {
    this.entityManager.remove(aggregate);
  }
}
