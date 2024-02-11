import {CcaPage} from "./cca-page.js";

export class EnterprisePage extends CcaPage{
    constructor(browser) {
        super(browser, "https://cca.enterprisealabama.com/1__memberdirectory.aspx");
    }
}