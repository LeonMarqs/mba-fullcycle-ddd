import Cpf from '../../../../common/domain/value-objects/cpf.vo';
import { Customer } from '../customer.entity';

test('Deve criar um cliente', () => {
  Customer.create({
    name: 'Leonardo',
    cpf: '700.497.940-78',
  });
});

test('Deve verificar se um cliente é igual ao outro', () => {
  const customer1 = Customer.create({
    name: 'Leonardo 1',
    cpf: '700.497.940-78',
  });

  const customer2 = new Customer({
    id: customer1.id.value,
    name: 'Leonardo 2',
    cpf: new Cpf('700.497.940-78'),
  });

  expect(customer1.equals(customer2)).toBeTruthy();
});
