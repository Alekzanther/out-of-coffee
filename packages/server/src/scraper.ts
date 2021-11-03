import puppeteer from 'puppeteer';

// when user adds product
// jack in to the mainframe of the request
// use the product URL as targetURl
// and also post the image (bad boy) to the database.

export async function scrapeProductUrl(targetUrl: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(targetUrl);

    const image = await page.evaluate(() =>
      document.querySelector('.product-image')?.getAttribute('src'),
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
