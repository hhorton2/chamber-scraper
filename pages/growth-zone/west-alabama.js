import {GrowthZonePage} from "./growth-zone-page.js";

export class WestAlabamaPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.tuscaloosachamber.com/list/search?sa=true")
    }
}