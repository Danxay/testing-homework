import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Catalog } from '../../src/client/pages/Catalog';
import { InitApplication } from './InitApplication';
import { Application } from '../../src/client/Application';

describe('Каталог', () => {
  it('В каталоге должны отображаться товары, список которых приходит с сервера', () => {
    const initState = {
      details: {},
      cart: {},
      products: [
        {
          id: 1,
          name: 'Handcrafted Bike',
          price: 901,
        },
        {
          id: 2,
          name: 'Fantastic Gloves',
          price: 120,
        },
      ],
    }
    const Application = InitApplication(Catalog, initState);
    const { queryByTestId } = render(Application);

    initState.products.forEach((value) => {
      const item = queryByTestId(`${value.id}`)

      expect(item)
        .toBeInTheDocument()
    })
  });
  it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', () => {
    const initState = {
      details: {},
      cart: {},
      products: [
        {
          id: 1,
          name: 'Handcrafted Bike',
          price: 901,
        },
        {
          id: 2,
          name: 'Fantastic Gloves',
          price: 120,
        },
      ],
    }
    const Application = InitApplication(Catalog, initState);
    const { queryByTestId } = render(Application);

    initState.products.forEach((value) => {
      const item = queryByTestId(`${value.id}`)
      const name = item.querySelector('.ProductItem-Name')
      const price = item.querySelector('.ProductItem-Price')
      const link = item.querySelector('.ProductItem-DetailsLink')

      expect(name)
        .toHaveTextContent(value.name)
      expect(price)
        .toHaveTextContent(`${value.price}`)
      expect(link)
        .toHaveAttribute('href', `/catalog/${value.id}`)
    })
  });
  it('На странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
    const initState = {
      details: {
        1: {
          id: 1,
          name: 'Handcrafted Bike',
          price: 901,
          description: 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
          material: 'Frozen',
          color: 'Olive',
        },
      },
      cart: {},
    }
    const store = createStore(() => initState);
    const { container } = render(
      <MemoryRouter initialEntries={['/catalog/1']}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>,
    )

    const name = container.querySelector('.ProductDetails-Name')
    const description = container.querySelector('.ProductDetails-Description')
    const price = container.querySelector('.ProductDetails-Price')
    const color = container.querySelector('.ProductDetails-Color')
    const material = container.querySelector('.ProductDetails-Material')
    const addToCart = container.querySelector('.ProductDetails-AddToCart')

    expect(name)
      .toHaveTextContent(initState.details[1].name)
    expect(description)
      .toHaveTextContent(initState.details[1].description)
    expect(price)
      .toHaveTextContent(`${initState.details[1].price}`)
    expect(color)
      .toHaveTextContent(initState.details[1].color)
    expect(material)
      .toHaveTextContent(initState.details[1].material)
    expect(addToCart)
      .toHaveTextContent('Add to Cart')
  });
  it('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом"', () => {
    const initState = {
      details: {},
      cart: {
        1: {
          name: 'Handcrafted Bike',
          price: 901,
          count: 2,
        },
      },
      products: [
        {
          id: 1,
          name: 'Handcrafted Bike',
          price: 901,
        },
        {
          id: 2,
          name: 'Fantastic Gloves',
          price: 120,
        },
      ],
    }
    const Application = InitApplication(Catalog, initState);
    const { queryByText } = render(Application);

    const message = queryByText('Item in cart')

    expect(message)
      .toBeInTheDocument()
  });
  it('Если товар уже добавлен в корзину, на странице товара должно отображаться сообщение об этом"', () => {
    const initState = {
      details: {
        1: {
          id: 1,
          name: 'Handcrafted Bike',
          price: 901,
          description: 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
          material: 'Frozen',
          color: 'Olive',
        },
      },
      cart: {
        1: {
          name: 'Handcrafted Bike',
          price: 901,
          count: 2,
        },
      },
    }
    const store = createStore(() => initState);
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/catalog/1']}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>,
    )

    const message = queryByText('Item in cart')

    expect(message)
      .toBeInTheDocument()
  });
});
