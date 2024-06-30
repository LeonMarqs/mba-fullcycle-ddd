import { Customer } from 'src/@core/events/domain/entities/customer.entity';
import { Name } from './name.vo';

test('Deve criar um nome válido', () => {
  const name = new Name('teste 123');
  expect(name.value).toBe('teste 123');

  const customer = new Customer({
    cpf: '111.111.111-11',
    name,
  });

  customer.name = new Name('bbbbb');
});
