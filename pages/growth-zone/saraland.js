import {GrowthZonePage} from "./growth-zone-page.js";

export class SaralandPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.saralandchamber.com/list/search?sa=true")
    }
}