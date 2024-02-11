async function extractNamesOnPage(page) {
    await page.waitForSelector('.ccaMemName');
    return await page.$$eval('.ccaMemName', links => links.map(link => link.textContent.trim()));
}

async function goToNextPage(page) {
    let currentPageUrl = await page.url(); // Capture the current URL

    // Attempt to click the "Next" button and wait for any navigation or network idle
    const nextButtonExists = await page.$('.ccaButtonStandard.ccaNext.ccaCustom');
    if (nextButtonExists) {
        await Promise.all([
            page.click('.ccaButtonStandard.ccaNext.ccaCustom'),
            page.waitForNavigation({waitUntil: 'networkidle2', timeout: 5000}).catch(() => 'timeout'), // Use a timeout to catch cases where no navigation occurs
        ]);

        let newPageUrl = await page.url(); // Capture the new URL
        return currentPageUrl !== newPageUrl; // Compare URLs to determine if navigation occurred
    }

    return false; // No next button found or navigation didn't occur, we are at the end
}

export class CcaPage {
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

        const businessNames = [];
        let pageNumber = 1;

        let hasMorePages = true;
        while (hasMorePages) {
            const names = await extractNamesOnPage(this.page);
            businessNames.push(...names);

            hasMorePages = await goToNextPage(this.page);
            pageNumber++;
        }

        await this.page.close();
        console.log(`${this.constructor.name} end`)
        return businessNames;
    }
}