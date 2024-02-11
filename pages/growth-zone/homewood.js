import {GrowthZonePage} from "./growth-zone-page.js";

export class HomewoodPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.homewoodchamber.org/list/search?sa=true")
    }
}