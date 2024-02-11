import puppeteer from 'puppeteer';
import {DothanPage} from "./pages/cca/dothan.js";
import {EnterprisePage} from "./pages/cca/enterprise.js";
import {EasternShorePage} from "./pages/growth-zone/eastern-shore.js";
import {HomewoodPage} from "./pages/growth-zone/homewood.js";
import {OpelikaPage} from "./pages/growth-zone/opelika.js";
import {PellCityPage} from "./pages/growth-zone/pell-city.js";
import {PrattvillePage} from "./pages/growth-zone/prattville.js";
import {SaralandPage} from "./pages/growth-zone/saraland.js";
import {ShelbyCountyPage} from "./pages/growth-zone/shelby-county.js";
import {SouthBaldwinPage} from "./pages/growth-zone/south-baldwin.js";
import {SouthwestMobilePage} from "./pages/growth-zone/southwest-mobile.js";
import {SylacaugaPage} from "./pages/growth-zone/sylacauga.js";
import {WestAlabamaPage} from "./pages/growth-zone/west-alabama.js";
import {WetumpkaPage} from "./pages/growth-zone/wetumpka.js";
import {MobilePage} from "./pages/chamber-master/mobile.js";
import {MontgomeryPage} from "./pages/chamber-master/montgomery.js";
import {TalladegaPage} from "./pages/chamber-master/talladega.js";
import {BbaPage} from "./pages/bba.js";

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const pages = [
        //Growth Zone
        new EasternShorePage(browser),
        new HomewoodPage(browser),
        new OpelikaPage(browser),
        new PellCityPage(browser),
        new PrattvillePage(browser),
        new SaralandPage(browser),
        new ShelbyCountyPage(browser),
        new SouthBaldwinPage(browser),
        new SouthwestMobilePage(browser),
        new SylacaugaPage(browser),
        new WestAlabamaPage(browser),
        new WetumpkaPage(browser),

        //Chamber Master
        new MobilePage(browser),
        new MontgomeryPage(browser),
        new TalladegaPage(browser),

        //CCA
        new DothanPage(browser),
        new EnterprisePage(browser),

        //Unique
        new BbaPage(browser),
    ]

    const batchProcess = async (batch) => {
        const startTime = Date.now();
        const promises = batch.map(p => p.getBusinessList());
        const results = await Promise.all(promises);
        const endTime = Date.now();
        console.log(results.flatMap(r => r).join("\n"));
        console.log(`Batch Time: ${(endTime - startTime) / 1000} seconds`);
    };

    for (let i = 0; i < pages.length; i += 5) {
        await batchProcess(pages.slice(i, i + 5));
    }


    await browser.close();
})();