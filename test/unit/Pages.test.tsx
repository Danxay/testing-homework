import { render } from '@testing-library/react';
import { Home } from '../../src/client/pages/Home';
import { InitApplication } from './InitApplication';
import { Catalog } from '../../src/client/pages/Catalog';
import { Delivery } from '../../src/client/pages/Delivery';
import { Contacts } from '../../src/client/pages/Contacts';
import { Cart } from '../../src/client/pages/Cart';

describe('В магазине должны быть страницы: главная, каталог, условия доставки, контакты, корзина', () => {
  it('Главная страница', () => {
    const Application = InitApplication(Home);
    const { container } = render(Application);

    const pageWrapper = container.querySelector('.Home')

    expect(pageWrapper)
      .toBeInTheDocument()
  });
  it('Страница каталог', () => {
    const Application = InitApplication(Catalog);
    const { container } = render(Application);

    const pageWrapper = container.querySelector('.Catalog')

    expect(pageWrapper)
      .toBeInTheDocument()
  });
  it('Страница условия доставки', () => {
    const Application = InitApplication(Delivery);
    const { container } = render(Application);

    const pageWrapper = container.querySelector('.Delivery')

    expect(pageWrapper)
      .toBeInTheDocument()
  });
  it('Страница контакты', () => {
    const Application = InitApplication(Contacts);
    const { container } = render(Application);

    const pageWrapper = container.querySelector('.Contacts')

    expect(pageWrapper)
      .toBeInTheDocument()
  });
  it('Страница корзина', () => {
    const Application = InitApplication(Cart);
    const { container } = render(Application);

    const pageWrapper = container.querySelector('.Cart')

    expect(pageWrapper)
      .toBeInTheDocument()
  });
});
