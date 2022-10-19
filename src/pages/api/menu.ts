// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import chrome from 'chrome-aws-lambda';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as puppeteer from 'puppeteer-core';
type Data = {
  data: string | null;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // const url = req.query.url as string;
  const url = req.body.url;
  console.log('start scraping: ', url);

  try {
    const options = await getOptions();

    const browser = await puppeteer.launch(options);
    // const browser = await puppeteer.launch({
    //   headless: chrome.headless,
    //   ignoreHTTPSErrors: true,
    //   executablePath: await chrome.executablePath,
    //   defaultViewport: chrome.defaultViewport,
    //   args: chrome.args,
    // });

    const page = await browser.newPage();

    page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
    );
    await page.goto(url);
    // const title = await page.mainFrame().title();
    // await page.screenshot({ path: `screenshots/${title}.png` });

    // const html =
    //   process.env.NODE_ENV === 'development'
    //     ? await page.content()
    //     : await page.evaluate(() => {
    //         return document.querySelector('body')?.innerHTML;
    //       });
    // const $ = load(html as string);
    // const script = $('script#__NEXT_DATA__[type="application/json"]').text();
    // const data = JSON.parse(script);
    const text = await page.$eval(
      'script#__NEXT_DATA__[type="application/json"]',
      (el: any) => el.textContent,
    );
    if (!text)
      return res.status(200).json({
        data: null,
      });

    const data = JSON.parse(text);
    await browser.close();
    res.status(200).json(data.props.initialReduxState.pageRestaurantDetail);
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error);
  }
}
const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const getOptions = async () => {
  let options;
  if (process.env.NODE_ENV === 'production') {
    options = {
      args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  } else {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  }
  return options;
};
