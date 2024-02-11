import {GrowthZonePage} from "./growth-zone-page.js";

export class OpelikaPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://business.opelikachamber.com/list/FindStartsWith?term=%23%21")
    }
}