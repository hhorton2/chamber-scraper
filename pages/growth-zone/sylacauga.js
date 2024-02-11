import {GrowthZonePage} from "./growth-zone-page.js";

export class SylacaugaPage extends GrowthZonePage {
    constructor(browser) {
        super(browser, "https://members.sylacaugachamber.com/list/search?sa=true")
    }
}