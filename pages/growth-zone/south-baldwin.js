import {GrowthZonePage} from "./growth-zone-page.js";

export class SouthBaldwinPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://www.southbaldwinchamber.com/list/search?sa=true")
    }
}