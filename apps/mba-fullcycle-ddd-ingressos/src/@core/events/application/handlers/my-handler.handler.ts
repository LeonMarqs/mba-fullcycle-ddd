import { IDomainEventHandler } from '../../../common/application/domain-event-handler';
import { DomainEventManager } from '../../../common/domain/domain-event-manager';
import { PartnerCreated } from '../../domain/domain-events/partner-created.event';
import { IPartnerRepository } from '../../domain/repositories/partner-repository.interface';

export class MyHandlerHandler implements IDomainEventHandler {
  constructor(
    private partnerRepo: IPartnerRepository,
    private domainEventManager: DomainEventManager,
  ) {}

  async handle(event: PartnerCreated): Promise<void> {
    console.log(event);
  }

  static listensTo(): string[] {
    return [PartnerCreated.name];
  }
}
