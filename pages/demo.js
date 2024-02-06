export class DemoPage {
    browser;
    page;

    constructor(browser) {
        this.browser = browser;
    }

    async getBlogTitle() {
        // Open a new page and save the page to our class variable
        this.page = await this.browser.newPage();

        // Set screen size
        await this.page.setViewport({width: 1920, height: 1080});

        // Navigate the page to a URL
        await this.page.goto('https://developer.chrome.com/');

        // Type into search box
        await this.page.type('.devsite-search-field', 'automate beyond recorder');

        //a html selector that we use to find the first search result
        const searchResultSelector = '.devsite-result-item-link';

        // Wait for it to appear on the page
        await this.page.waitForSelector(searchResultSelector);

        //click it
        await this.page.click(searchResultSelector);

        // same thing as above but provide the selector text directly (instead of in a variable)
        const textSelector = await this.page.waitForSelector(
            'text/Customize and automate'
        );

        // evaluate lets you run javascript in the context of the page
        // in this case we are getting the text content of the html element
        // we selected with the 'text/Customize and automate' selector
        const fullTitle = await textSelector?.evaluate(el => el.textContent);
        await this.page.close();
        return fullTitle;
    }
}