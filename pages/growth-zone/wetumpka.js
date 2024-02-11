import {GrowthZonePage} from "./growth-zone-page.js";

export class WetumpkaPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.wetumpkachamber.org/list/search?sa=true")
    }
}