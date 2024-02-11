import {ChamberMasterPage} from "./chamber-master-page.js";

export class TalladegaPage extends ChamberMasterPage {
    constructor(browser) {
        super(browser, "https://talladegachamber.chambermaster.com/list/search?sa=true")
    }
}