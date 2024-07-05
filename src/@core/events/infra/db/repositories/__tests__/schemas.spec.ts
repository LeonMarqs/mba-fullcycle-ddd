import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { Partner } from 'src/@core/events/domain/entities/partner.entity';
import { PartnerSchema } from '../../schemas';

test('Deve criar um partner', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [PartnerSchema],
    dbName: 'events',
    host: 'localhost',
    user: 'root',
    password: 'root',
    type: 'mysql',
    forceEntityConstructor: true,
  });

  await orm.schema.refreshDatabase();
  const em = orm.em.fork();

  const partner = Partner.create({ name: 'Partner 1' });

  em.persist(partner);
  await em.flush();

  await orm.close();
});
