import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  test('If card number would be invalid, suitable message would be shown', async () => {
    await page.goto(baseUrl);
    
    const message = await page.$('.message');
    const submitBtn = await page.$('.btn');
    const input = await page.$('.input');

    const cardNumber = '4929585536565437144';

    await input.type(cardNumber);
    await submitBtn.click();

    await message.textContent === 'Your card is invalid';

  });

  test('If card number would be valid, suitable message would be shown', async () => {
    await page.goto(baseUrl);
    
    const message = await page.$('.message');
    const submitBtn = await page.$('.btn');
    const input = await page.$('.input');

    const cardNumber = '2221000678703900';

    await input.type(cardNumber);
    await submitBtn.click();

    await message.textContent === 'Your card is valid';

  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
