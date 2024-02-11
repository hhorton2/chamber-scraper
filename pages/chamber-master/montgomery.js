import {ChamberMasterPage} from "./chamber-master-page.js";

export class MontgomeryPage extends ChamberMasterPage {
    constructor(browser) {
        super(browser, "https://www.montgomerychamber.com/list/search?sa=true")
    }
}