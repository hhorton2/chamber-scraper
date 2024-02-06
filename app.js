import puppeteer from 'puppeteer';
import {DemoPage} from "./pages/demo.js";

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const demoPage = new DemoPage(browser);
    const blogTitle = await demoPage.getBlogTitle();
    // Print the full title
    console.log(`The title of this blog post is ${blogTitle}.`);

    await browser.close();
})();