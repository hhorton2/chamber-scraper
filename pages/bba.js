export class BbaPage {
    browser;
    page;

    constructor(browser) {
        this.browser = browser;
    }

    async getBusinessList() {
        console.log(`${this.constructor.name} start`)

        // Open a new page and save the page to our class variable
        this.page = await this.browser.newPage();

        // Set screen size
        await this.page.setViewport({width: 1920, height: 1080});

        // Navigate the page to a URL
        await this.page.goto('https://www.birminghambusinessalliance.com/investor-directory#!directory'); // Replace with the actual URL
        const that = this;

        // Function to scroll to the bottom of the page
        async function scrollToBottom() {
            await that.page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    var totalHeight = 0;
                    var distance = 100;
                    var timer = setInterval(() => {
                        var scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if (totalHeight >= scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            });
        }

        // Scroll to the bottom to ensure all elements are loaded
        await scrollToBottom();

        // Extract business names
        const businessNames = await this.page.$$eval('.SFcrd[title]', links => links.map(link => link.title));


        await this.page.close();
        console.log(`${this.constructor.name} end`)
        return businessNames;
    }
}