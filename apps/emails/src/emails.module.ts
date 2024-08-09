import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://admin:admin@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [EmailsController],
  providers: [EmailsService, ConsumerService],
})
export class EmailsModule {}
