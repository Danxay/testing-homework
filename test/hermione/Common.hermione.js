const { assert } = require('chai');

let bugId = '';

if (process.env.BUG_ID !== undefined) {
  bugId = process.env.BUG_ID
}

describe('Общие требования', () => {
  it('Вёрстка должна адаптироваться под ширину экрана 1400px', async ({ browser }) => {
    await browser.setWindowSize(1400, 1050);
    await browser.url(`#?bug_id=${bugId}`);

    const page = await browser.$('.Application');
    await page.waitForExist();

    await browser.assertView('plain', '.Application', {
      ignoreElements: ['.navbar .container'],
    });
  })
  it('Вёрстка должна адаптироваться под ширину экрана 1200px', async ({ browser }) => {
    await browser.setWindowSize(1200, 1000);
    await browser.url(`#?bug_id=${bugId}`);

    const page = await browser.$('.Application');
    await page.waitForExist();

    await browser.assertView('plain', '.Application', {
      ignoreElements: ['.navbar .container'],
    });
  })
  it('Вёрстка должна адаптироваться под ширину экрана 992px', async ({ browser }) => {
    await browser.setWindowSize(992, 1000);
    await browser.url(`#?bug_id=${bugId}`);

    const page = await browser.$('.Application');
    await page.waitForExist();

    await browser.assertView('plain', '.Application', {
      ignoreElements: ['.navbar .container'],
    });
  })
  it('Вёрстка должна адаптироваться под ширину экрана 768px', async ({ browser }) => {
    await browser.setWindowSize(768, 1000);
    await browser.url(`#?bug_id=${bugId}`);

    const page = await browser.$('.Application');
    await page.waitForExist();

    await browser.assertView('plain', '.Application', {
      ignoreElements: ['.navbar .container'],
    });
  })
  it('Вёрстка должна адаптироваться под ширину экрана 576px', async ({ browser }) => {
    await browser.setWindowSize(576, 1000);
    await browser.url(`#?bug_id=${bugId}`);

    const page = await browser.$('.Application');
    await page.waitForExist();

    await browser.assertView('plain', '.Application', {
      ignoreElements: ['.navbar .container'],
    });
  })
  it('На ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async ({ browser }) => {
    await browser.setWindowSize(575, 1000);
    await browser.url(`#?bug_id=${bugId}`);

    const menu = await browser.$('.Application-Menu');
    const toggler = await browser.$('.Application-Toggler');

    assert.equal(await menu.isDisplayed(), false, 'Меню должно пропасть')
    assert.equal(await toggler.isDisplayed(), true, '"Гамбургер" должен быть виден')
  })
  it('При выборе элемента из меню "гамбургера", меню должно закрываться', async ({ browser }) => {
    await browser.setWindowSize(575, 1000);
    await browser.url(`#?bug_id=${bugId}`);

    const menu = await browser.$('.Application-Menu');
    const toggler = await browser.$('.Application-Toggler');

    await toggler.click()
    assert.equal(await menu.isDisplayed(), true, 'Меню должно быть видно после клика на  "гамбургера"')

    await menu.click()
    assert.equal(await menu.isDisplayed(), false, 'Меню должно пропасть после клика на элемент')
  });
})
