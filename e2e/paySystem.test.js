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

  test('Suitable card-system icon will be coloured if card-number assumed to be correct', async () => {
    await page.goto(baseUrl);

    const input = await page.$('.input');
    const submitBtn = await page.$('.btn');

    const cardNumber = '4929585536565437144';

    await input.type(cardNumber);
    await submitBtn.click();

    await page.waitForSelector('.paysystem_valid');

  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
