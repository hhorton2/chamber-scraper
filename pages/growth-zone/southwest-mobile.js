import {GrowthZonePage} from "./growth-zone-page.js";

export class SouthwestMobilePage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.swmcchamber.com/directory/FindStartsWith?term=%23%21")
    }
}