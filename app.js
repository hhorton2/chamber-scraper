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
import stringSimilarity from "string-similarity"
import {Mutex} from "async-mutex"
import {Sequelize} from "sequelize";
import alias from "./models/alias.js";
import business from "./models/business.js";

//normalize business names
function normalizeName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/gi, ' ').trim();
}

// Group similar businesses
function groupSimilarBusinesses(businessNames, similarityThreshold = 0.8) {
    const normalizedNames = businessNames.map(name => normalizeName(name));
    const groups = [];
    const matchedIndices = new Set();

    normalizedNames.forEach((name, index) => {
        if (matchedIndices.has(index)) return; // Skip if already matched

        const group = {business: name, aliases: []};
        matchedIndices.add(index);

        // Compare with other names
        normalizedNames.forEach((otherName, otherIndex) => {
            if (index !== otherIndex && !matchedIndices.has(otherIndex)) {
                const similarity = stringSimilarity.compareTwoStrings(name, otherName);
                if (similarity > similarityThreshold) {
                    group.aliases.push(businessNames[otherIndex]);
                    matchedIndices.add(otherIndex);
                }
            }
        });

        // Use original name for business and aliases
        group.business = businessNames[index];
        groups.push(group);
    });

    return groups;
}

async function processPagesInBatches(pages, batchSize, mutex) {
    // Splitting pages into batches
    const batches = [];
    for (let i = 0; i < pages.length; i += batchSize) {
        batches.push(pages.slice(i, i + batchSize));
    }

    let allResults = [];

    // Function to process a single page and safely add results
    async function processPage(pageInstance) {
        try {
            const names = await pageInstance.getBusinessList();
            const release = await mutex.acquire(); // Ensure safe adding
            allResults = allResults.concat(names);
            release(); // Release lock
        } catch (error) {
            console.error(`Failed to load page ${pageInstance.constructor.name}:`, error.message);
        }
    }

    // Process each batch
    for (const batch of batches) {
        await Promise.all(batch.map(pageInstance => processPage(pageInstance)));
    }

    // Remove duplicates and sort
    const uniqueResults = [...new Set(allResults)].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    return uniqueResults;
}

(async () => {
    const db = new Sequelize({dialect: "sqlite", storage: "./chamberDB.sqlite"});
    const Alias = alias(db)
    const Business = business(db)


    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await Business.create({name: 'test business'});
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
    const mutex = new Mutex();

    const batchSize = 9; // Number of groups to batch operations into
    const uniqueResults = await processPagesInBatches(pages, batchSize, mutex);

    console.log(uniqueResults.join("\n"));
    // Group similar businesses
    const groupedBusinesses = groupSimilarBusinesses(uniqueResults);

    // Display the results
    for (const group of groupedBusinesses) {
        console.log(`Business: ${group.business}`);
        const business = await Business.create({name: group.business});
        if (group.aliases.length) {
            console.log(`Aliases: ${group.aliases.join(', ')}`);
            for (const alias of group.aliases) {
                await Alias.create({name: alias, businessId: business.id})
            }
        }
        console.log('');
    }
    console.log(`Total Unique Results: ${uniqueResults.length}`);

    await browser.close();
})();