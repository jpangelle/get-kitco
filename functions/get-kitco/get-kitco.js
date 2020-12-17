const chromium = require('chrome-aws-lambda');

exports.handler = async () => {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: await chromium.args,
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto('https://www.kitco.com/jewelry/', {
    waitUntil: 'networkidle2',
  });

  const innerText = await page.evaluate(
    () => document.querySelector('.gold-mt > p').innerText,
  );

  await browser.close();

  const split = innerText.split(' ');

  return {
    statusCode: 200,
    body: JSON.stringify({ price: split[1] }),
  };
};
