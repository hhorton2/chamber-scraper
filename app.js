import puppeteer from 'puppeteer-extra';
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
import StealthPlugin from "puppeteer-extra-plugin-stealth"

(async () => {
    // Launch the browser and open a new blank page
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({args: ['--no-sandbox'], headless: true});
    const pages = [
        //Growth Zone
        new EasternShorePage(await browser.createBrowserContext()),
        new HomewoodPage(await browser.createBrowserContext()),
        new OpelikaPage(await browser.createBrowserContext()),
        new PellCityPage(await browser.createBrowserContext()),
        new PrattvillePage(await browser.createBrowserContext()),
        new SaralandPage(await browser.createBrowserContext()),
        new ShelbyCountyPage(await browser.createBrowserContext()),
        new SouthBaldwinPage(await browser.createBrowserContext()),
        new SouthwestMobilePage(await browser.createBrowserContext()),
        new SylacaugaPage(await browser.createBrowserContext()),
        new WestAlabamaPage(await browser.createBrowserContext()),
        new WetumpkaPage(await browser.createBrowserContext()),

        //Chamber Master
        new MobilePage(await browser.createBrowserContext()),
        new MontgomeryPage(await browser.createBrowserContext()),
        new TalladegaPage(await browser.createBrowserContext()),

        //CCA
        new DothanPage(await browser.createBrowserContext()),
        new EnterprisePage(await browser.createBrowserContext()),

        //Unique
        new BbaPage(await browser.createBrowserContext()),
    ]
    let allResults = [];
    for (let pageInstance of pages) {
        try {
            const names = await pageInstance.getBusinessList();
            allResults = allResults.concat(names);
        } catch (error) {
            console.error(`Failed to load page ${pageInstance.constructor.name}:`, error.message);
        }
    }
    const uniqueResults = [...new Set(allResults)].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    console.log(uniqueResults.join("\n"));
    console.log(`Total Unique Results: ${uniqueResults.length}`);

    await browser.close();


    await browser.close();
})();