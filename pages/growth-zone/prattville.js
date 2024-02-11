import {GrowthZonePage} from "./growth-zone-page.js";

export class PrattvillePage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://online.prattvillechamber.com/list/search?sa=true")
    }
}