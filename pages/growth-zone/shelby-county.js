import {GrowthZonePage} from "./growth-zone-page.js";

export class ShelbyCountyPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.shelbychamber.org/list/search?sa=true")
    }
}