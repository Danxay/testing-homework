import { render } from '@testing-library/react';
import { InitApplication } from './InitApplication';

describe('Навигация', () => {
  it('В шапке отображаются ссылки на страницы магазина, а также ссылка на корзину', () => {
    const Application = InitApplication();
    const { queryByRole } = render(Application);

    const catalog = queryByRole('link', { name: 'Catalog' })
    const delivery = queryByRole('link', { name: 'Delivery' })
    const contacts = queryByRole('link', { name: 'Contacts' })
    const cart = queryByRole('link', { name: 'Cart' })

    expect(catalog)
      .toBeInTheDocument()
    expect(catalog)
      .toHaveAttribute('href', '/catalog')

    expect(delivery)
      .toBeInTheDocument()
    expect(delivery)
      .toHaveAttribute('href', '/delivery')

    expect(contacts)
      .toBeInTheDocument()
    expect(contacts)
      .toHaveAttribute('href', '/contacts')

    expect(cart)
      .toBeInTheDocument()
    expect(cart)
      .toHaveAttribute('href', '/cart')
  });
  it('Название магазина в шапке должно быть ссылкой на главную страницу', () => {
    const Application = InitApplication();
    const { queryByTestId } = render(Application)

    const name = queryByTestId('Brand')

    expect(name)
      .toHaveAttribute('href', '/')
  });
});
