const { assert } = require('chai');

let bugId = '';

if (process.env.BUG_ID !== undefined) {
  bugId = process.env.BUG_ID
}

describe('Каталог', () => {
  it('Содержимое корзины должно сохраняться между перезагрузками страницы', async ({ browser }) => {
    await browser.url(`catalog/0?bug_id=${bugId}`);
    const addToCart = await browser.$('.ProductDetails-AddToCart');
    await addToCart.click();

    await browser.url('cart')
    const productNameBefore = await browser.$('.Cart-Name')
      .getText();

    browser.refresh();
    const productNameAfter = await browser.$('.Cart-Name')
      .getText();
    assert.equal(productNameBefore, productNameAfter, 'Содержимое корзины не сохранилось после перезагрузки');
  })
  it('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async ({ browser }) => {
    await browser.url(`cart?bug_id=${bugId}`)
    const clearCart = await browser.$('.Cart-Clear');
    await clearCart.click();

    await browser.url('catalog/0');
    let addToCart = await browser.$('.ProductDetails-AddToCart');
    await addToCart.click();

    await browser.url('cart');
    const productCountBefore = await browser.$('.Cart-Count')
      .getText();
    assert.equal(
      productCountBefore,
      '1',
      'В корзине должно быть 1 единица товара',
    );

    await browser.url(`catalog/0?bug_id=${bugId}`);
    addToCart = await browser.$('.ProductDetails-AddToCart');
    await addToCart.click()

    await browser.url('cart');
    const productCountAfter = await browser.$('.Cart-Count')
      .getText();
    assert.equal(
      productCountAfter,
      2,
      'Количество товара в корзине должно увеличиться до 2',
    );
  })
})
