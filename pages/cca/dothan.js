import {CcaPage} from "./cca-page.js";

export class DothanPage extends CcaPage{
    constructor(browser) {
        super(browser, "https://cca.dothan.com/1__memberdirectory.aspx");
    }
}