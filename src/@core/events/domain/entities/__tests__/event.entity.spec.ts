import { Partner } from '../partner.entity';

test('Deve criar um evento', () => {
  const partner: Partner = Partner.create({
    name: 'Parceiro 2',
  });

  const event = partner.initEvent({
    name: 'Evento 1',
    description: 'Descrição evento 1',
    date: new Date(),
  });

  event.addSection({
    name: 'Sessão teste 1',
    price: 20,
    total_spots: 12,
  });

  expect(event._sections.size).toBe(1);
  expect(event.total_spots).toBe(12);

  const [section] = event._sections;

  expect(section._spots.size).toBe(12);
});

test('Deve publicar todos os itens do evento', () => {
  const partner: Partner = Partner.create({
    name: 'Parceiro 2',
  });

  const event = partner.initEvent({
    name: 'Evento 1',
    description: 'Descrição evento 1',
    date: new Date(),
  });

  event.addSection({
    name: 'Sessão teste 1',
    price: 20,
    total_spots: 12,
  });

  event.addSection({
    name: 'Sessão teste 1',
    price: 50,
    total_spots: 6,
  });

  event.publishAll();

  expect(event.is_published).toBe(true);

  const [section1, section2] = event._sections.values();

  expect(section1.is_published).toBe(true);
  expect(section2.is_published).toBe(true);

  [...section1._spots, ...section2._spots].forEach((spot) => {
    expect(spot.is_published).toBe(true);
  });
});
