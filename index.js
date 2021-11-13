const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/");
  await page.screenshot({ path: "mywebsite.png" });

  const grabQuotes = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    let quotesArr = [];

    quotes.forEach((quoteTag) => {
      const quoteInfo = quoteTag.querySelectorAll("span");
      const actualQuote = quoteInfo[0];
      const acutalAuthor = quoteInfo[1];

      const authorName = acutalAuthor.querySelector("small");

      quotesArr.push({
        quote: actualQuote.innerText,
        author: authorName.innerText,
      });
    });
    return quotesArr;
  });

  console.log(grabQuotes);

  await page.click('a[href="/login"]');

  await page.type("#username", "Justin", { delay: 100 });
  await page.type("#password", "Password123", { delay: 100 });
  await page.click('input[value="Login"]');

  //   await browser.close();
})();
