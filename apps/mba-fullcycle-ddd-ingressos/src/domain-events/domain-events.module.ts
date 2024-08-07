import { Global, Module } from '@nestjs/common';
import { DomainEventManager } from '../@core/common/domain/domain-event-manager';
import { IntegrationEventPublisher } from './integration-events.publisher';

@Global()
@Module({
  providers: [DomainEventManager, IntegrationEventPublisher],
  exports: [DomainEventManager],
})
export class DomainEventsModule {}
