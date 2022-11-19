import React from 'react';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { InitApplication } from './InitApplication';
import { Application } from '../../src/client/Application';
import { Cart } from '../../src/client/pages/Cart';
import { ExampleApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';

describe('Корзина', () => {
  it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', () => {
    const initState = {
      details: {},
      cart: {
        1: {
          name: 'Handcrafted Bike',
          price: 901,
          count: 2,
        },
        2: {
          name: 'Fantastic Gloves',
          price: 120,
          count: 1,
        },
      },
    }
    const application = InitApplication(Application, initState);
    const { queryByRole } = render(application);

    const cart = queryByRole('link', { name: `Cart (${Object.keys(initState.cart).length})` })

    expect(cart)
      .toBeInTheDocument()
  });
  it('В корзине должна отображаться таблица с добавленными в нее товарами', () => {
    const initState = {
      details: {},
      cart: {
        1: {
          name: 'Handcrafted Bike',
          price: 901,
          count: 2,
        },
        2: {
          name: 'Fantastic Gloves',
          price: 120,
          count: 1,
        },
      },
    }
    const application = InitApplication(Cart, initState);
    const { queryByTestId } = render(application);

    Object.keys(initState.cart).forEach((v) => {
      const item = queryByTestId(`${v}`)

      expect(item)
        .toBeInTheDocument()
    })
  });
  it('Для каждого товара должны отображаться название, цена, количество, а также должна отображаться общая сумма заказа', () => {
    const initState = {
      details: {},
      cart: {
        1: {
          name: 'Handcrafted Bike',
          price: 901,
          count: 2,
        },
        2: {
          name: 'Fantastic Gloves',
          price: 120,
          count: 1,
        },
      },
    }
    const application = InitApplication(Cart, initState);
    const { queryByTestId } = render(application);

    Object.values(initState.cart)
      .forEach((v, i) => {
        const item = queryByTestId(`${i + 1}`);
        const name = item.querySelector('.Cart-Name')
        const price = item.querySelector('.Cart-Price')
        const count = item.querySelector('.Cart-Count')
        const total = item.querySelector('.Cart-Total')

        expect(name)
          .toHaveTextContent(v.name)
        expect(price)
          .toHaveTextContent(`${v.price}`)
        expect(count)
          .toHaveTextContent(`${v.count}`)
        expect(total)
          .toHaveTextContent(`${v.price * v.count}`)
      })
  });
  it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', () => {
    const cart = {
      getState: () => ({
        1: {
          name: 'Handcrafted Bike',
          price: 901,
          count: 2,
        },
        2: {
          name: 'Fantastic Gloves',
          price: 120,
          count: 1,
        },
      }),
      setState: () => {},
    }
    const api = new ExampleApi('/');

    const store = initStore(api, cart);

    const { queryByRole } = render(
      <BrowserRouter basename="/">
        <Provider store={store}>
          <Application />
        </Provider>
      </BrowserRouter>,
    )

    events.click(queryByRole('button', { name: 'Clear shopping cart' }));

    expect(queryByRole('table'))
      .not
      .toBeInTheDocument();
  });
  it('Если корзина пустая, должна отображаться ссылка на каталог товаров', () => {
    const initState = {
      details: {},
      cart: {},
    }
    const application = InitApplication(Cart, initState);
    const { queryByRole } = render(application);

    const link = queryByRole('link', { name: 'catalog' })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/catalog')
  });
});
