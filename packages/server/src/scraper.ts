import puppeteer from 'puppeteer';

// when user adds product
// jack in to the mainframe of the request
// use the product URL as targetURl
// and also post the image (bad boy) to the database.

export async function scrapeProductUrl(targetUrl: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(targetUrl, {
      waitUntil: 'networkidle2',
    });

    const btn = await page.evaluate(() =>
      document.querySelector('button[type="submit"]'),
    );

    if (btn !== null) await page.click('button[type="submit"]');

    const image = await page.evaluate(() =>
      document
        .querySelector('.image-container > figure > img')
        ?.getAttribute('src'),
    );

    // the bad boy
    console.log(image);

    await browser.close();
    return image;
  } catch (error) {
    console.log(error);
    return null;
  }
}
