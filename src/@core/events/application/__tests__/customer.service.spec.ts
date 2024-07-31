import { MikroORM, MySqlDriver } from '@mikro-orm/mysql';
import { UnitOfWorkMikroOrm } from '../../../common/infra/unit-of-work-mikro-orm';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerMysqlRepository } from '../../infra/db/repositories/customer-mysql.repository';
import { CustomerSchema } from '../../infra/db/schemas';
import { CustomerService } from '../customer.service';

test('Deve listar os customers', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [CustomerSchema],
    dbName: 'events',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    type: 'mysql',
    forceEntityConstructor: true,
  });
  await orm.schema.refreshDatabase();
  const em = orm.em.fork();
  const unitOfWork = new UnitOfWorkMikroOrm(em);
  const customerRepo = new CustomerMysqlRepository(em);
  const customerService = new CustomerService(customerRepo, unitOfWork);

  const customer = Customer.create({
    name: 'Customer 1',
    cpf: '703.758.870-91',
  });
  await customerRepo.add(customer);
  await em.flush();
  em.clear(); // limpa o cache do entity manager (unit of work)

  const customers = await customerService.list();

  console.log(customers);

  await orm.close();
});

test('Deve registrar um novo customer', async () => {
  const orm = await MikroORM.init<MySqlDriver>({
    entities: [CustomerSchema],
    dbName: 'events',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    type: 'mysql',
    forceEntityConstructor: true,
  });
  await orm.schema.refreshDatabase();
  const em = orm.em.fork();
  const unitOfWork = new UnitOfWorkMikroOrm(em);
  const customerRepo = new CustomerMysqlRepository(em);
  const customerService = new CustomerService(customerRepo, unitOfWork);

  const customer = await customerService.create({
    name: 'Customer 1',
    cpf: '703.758.870-91',
  });

  expect(customer).toBeInstanceOf(Customer);
  expect(customer.id).toBeDefined();
  expect(customer.name).toBe('Customer 1');
  expect(customer.cpf.value).toBe('70375887091');

  await em.clear();

  const newCustomer = await customerRepo.findById(customer.id);
  expect(newCustomer).toBeInstanceOf(Customer);
  expect(newCustomer.id).toBeDefined();
  expect(newCustomer.name).toBe('Customer 1');
  expect(newCustomer.cpf.value).toBe('70375887091');

  await orm.close();
});
