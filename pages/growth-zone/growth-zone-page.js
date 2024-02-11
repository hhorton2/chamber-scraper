export class GrowthZonePage {
    browser;
    page;
    url;

    constructor(browser, url) {
        this.browser = browser;
        this.url = url;
    }

    async getBusinessList() {
        console.log(`${this.constructor.name} start`)
        // Open a new page and save the page to our class variable
        this.page = await this.browser.newPage();

        // Set screen size
        await this.page.setViewport({width: 1920, height: 1080});

        // Navigate the page to a URL
        await this.page.goto(this.url); // Replace with the actual URL

        // Grab the text content of all spans with class 'gz-img-placeholder' and deduplicate them
        const result =  await this.page.$$eval('.gz-img-placeholder', elements => {
            // Map through each element to get the closest parent 'a' tag and its 'alt' attribute
            const alts = elements.map(el => {
                // Navigate up the DOM to find the parent 'a' tag
                const parentAnchor = el.closest('.card-header').querySelector('a');
                // Return the 'alt' attribute of the 'a' tag, or an empty string if not found
                return parentAnchor ? parentAnchor.getAttribute('alt') : '';
            });
            // Deduplicate the alt texts
            return [...new Set(alts)];
        });
        await this.page.close();
        console.log(`${this.constructor.name} end`)
        return result;
    }
}