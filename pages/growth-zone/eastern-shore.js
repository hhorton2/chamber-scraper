import {GrowthZonePage} from "./growth-zone-page.js";

export class EasternShorePage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.eschamber.com/list/search?sa=true")
    }
}