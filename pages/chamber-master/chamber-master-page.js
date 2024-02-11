export class ChamberMasterPage {
    browser;
    page;
    url;
    selector;


    constructor(browser, url, selector = '.mn-title a') {
        this.browser = browser;
        this.url = url;
        this.selector = selector;
    }

    async getBusinessList() {
        console.log(`${this.constructor.name} start`)
        // Open a new page and save the page to our class variable
        this.page = await this.browser.newPage();

        // Set screen size
        await this.page.setViewport({width: 1920, height: 1080});

        // Navigate the page to a URL
        await this.page.goto(this.url); // Replace with the actual URL

        await this.page.waitForSelector(this.selector);

        // Grab the text content of all spans with class 'gz-img-placeholder' and deduplicate them
        const result = await this.page.$$eval(this.selector, elements => {
            return [...new Set(elements.map(element => element.textContent.trim()))];
        });
        await this.page.close();
        console.log(`${this.constructor.name} end`)
        return result;

    }
}