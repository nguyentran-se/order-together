// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cheerio from 'cheerio';
import chrome from 'chrome-aws-lambda';
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
type Data = {
  data: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const url = req.query.url as string;
  console.log('start scraping: ', url);

  try {
    const options = await getOptions();

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();

    page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
    );
    await page.goto(url);
    // const title = await page.mainFrame().title();
    // await page.screenshot({ path: `screenshots/${title}.png` });

    const html =
      process.env.NODE_ENV === 'development'
        ? await page.content()
        : await page.evaluate(() => {
            return document.querySelector('body')?.innerHTML;
          });
    const $ = cheerio.load(html as string);
    const script = $('script#__NEXT_DATA__[type="application/json"]').text();
    const data = JSON.parse(script);

    res.status(200).json({ data: data });
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
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
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
