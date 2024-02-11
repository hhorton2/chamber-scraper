import {ChamberMasterPage} from "./chamber-master-page.js";

export class MobilePage extends ChamberMasterPage {
    constructor(browser) {
        super(browser, "https://my.mobilechamber.com/chambermemberdirectory/FindStartsWith?term=%23%21", ".card-title a")
    }
}