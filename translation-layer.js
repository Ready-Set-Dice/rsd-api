const fs = require('fs');
const path = require('path');

const PACKSPATH = './packs';
const DATAPATH = './data';
const TRANSLATEPATH = './translate';

if (fs.existsSync(PACKSPATH)) {
    console.log('The packs folder exists, starting the translation layer.');

    if (!fs.existsSync(DATAPATH)) {
        fs.mkdirSync(DATAPATH);
    }

    const conditionsTranslator = new (require(path.resolve(`${TRANSLATEPATH}/conditions.js`)))(PACKSPATH, DATAPATH);
    conditionsTranslator.processPack();

} else {
    console.error('The packs folder does not appear to exist; Exitting.');
}