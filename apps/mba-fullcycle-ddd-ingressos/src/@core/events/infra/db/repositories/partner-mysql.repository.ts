import { EntityManager } from '@mikro-orm/mysql';
import {
  Partner,
  PartnerId,
} from '../../../../events/domain/entities/partner.entity';
import { IPartnerRepository } from '../../../../events/domain/repositories/partner-repository.interface';

export class PartnerMysqlRepository implements IPartnerRepository {
  constructor(private entityManager: EntityManager) {}

  async add(aggregate: Partner): Promise<void> {
    this.entityManager.persist(aggregate);
  }
  async findById(id: string | PartnerId): Promise<Partner | null> {
    return this.entityManager.findOne(Partner, {
      id: typeof id === 'string' ? new PartnerId(id) : id,
    });
  }
  async findAll(): Promise<Partner[]> {
    return this.entityManager.find(Partner, {});
  }
  async delete(aggregate: Partner): Promise<void> {
    this.entityManager.remove(aggregate);
  }
}
