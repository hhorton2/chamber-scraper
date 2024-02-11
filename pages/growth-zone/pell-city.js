import {GrowthZonePage} from "./growth-zone-page.js";

export class PellCityPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "http://business.pellcitychamber.com/list/search?sa=true")
    }
}