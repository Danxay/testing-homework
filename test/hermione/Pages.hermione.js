let bugId = '';

if (process.env.BUG_ID !== undefined) {
  bugId = process.env.BUG_ID
}

describe('Cтраницы главная, условия доставки, контакты должны иметь статическое содержимое', () => {
  it('Главная страница', async ({ browser }) => {
    await browser.setWindowSize(1400, 1000)

    await browser.url(`#?bug_id=${bugId}`);
    await browser.assertView('home', '.Application');
  })
  it('Страница условия доставки', async ({ browser }) => {
    await browser.setWindowSize(1400, 1000)

    await browser.url(`delivery?bug_id=${bugId}`);
    await browser.assertView('delivery', '.Application');
  })
  it('Страница контакты', async ({ browser }) => {
    await browser.setWindowSize(1400, 1000)

    await browser.url(`contacts?bug_id=${bugId}`);
    await browser.assertView('contacts', '.Application');
  })
})
