const express = require('express');
const router = express.Router();
const fs = require('graceful-fs')
const path = require('path')

const localizeFile = path.resolve('./static/lang/en.json')
let localizerawdata = fs.readFileSync(localizeFile)
let localize = JSON.parse(localizerawdata)

const localizeREFile = path.resolve('./static/lang/re-en.json')
let localize_rerawdata = fs.readFileSync(localizeREFile)
let localize_re = JSON.parse(localize_rerawdata)

// console.log(localize)

const bestiary1Folder = path.resolve('./packs/pathfinder-bestiary')
const bestiary2Folder = path.resolve('./packs/pathfinder-bestiary-2')
const bestiary3Folder = path.resolve('./packs/pathfinder-bestiary-3')

let bestiary1 = {count:0, results:[]}
let bestiary2 = {count:0, results:[]}
let bestiary3 = {count:0, results:[]}

const abomination_vaults_bestiaryFolder = path.resolve('./packs/abomination-vaults-bestiary')

const age_of_ashes_bestiaryFolder = path.resolve('./packs/age-of-ashes-bestiary')
const agents_of_edgewatch_bestiaryFolder = path.resolve('./packs/agents-of-edgewatch-bestiary')
const blog_bestiaryFolder = path.resolve('./packs/blog-bestiary')
const blood_lords_bestiaryFolder = path.resolve('./packs/blood-lords-bestiary')
const book_of_the_dead_bestiaryFolder = path.resolve('./packs/book-of-the-dead-bestiary')
const crown_of_the_kobold_king_bestiaryFolder = path.resolve('./packs/crown-of-the-kobold-king-bestiary')
const extinction_curse_bestiaryFolder = path.resolve('./packs/extinction-curse-bestiary')
const fall_of_plaguestoneFolder = path.resolve('./packs/fall-of-plaguestone')
const fists_of_the_ruby_phoenix_bestiaryFolder = path.resolve('./packs/fists-of-the-ruby-phoenix-bestiary')
const gatewalkers_bestiaryFolder = path.resolve('./packs/gatewalkers-bestiary')
const impossible_lands_bestiaryFolder = path.resolve('./packs/impossible-lands-bestiary')
const malevolence_bestiaryFolder = path.resolve('./packs/malevolence-bestiary')
const menace_under_otari_bestiaryFolder = path.resolve('./packs/menace-under-otari-bestiary')
const monsters_of_myth_bestiaryFolder = path.resolve('./packs/monsters-of-myth-bestiary')
const mwangi_expanse_bestiaryFolder = path.resolve('./packs/mwangi-expanse-bestiary')
const night_of_the_gray_death_bestiaryFolder = path.resolve('./packs/night-of-the-gray-death-bestiary')
const kingmaker_bestiaryFolder = path.resolve('./packs/kingmaker-bestiary')
const npc_galleryFolder = path.resolve('./packs/npc-gallery')
const one_shot_bestiaryFolder = path.resolve('./packs/one-shot-bestiary')
const outlaws_of_alkenstar_bestiaryFolder = path.resolve('./packs/outlaws-of-alkenstar-bestiary')
const pathfinder_dark_archiveFolder = path.resolve('./packs/pathfinder-dark-archive')
const pfs_introductions_bestiaryFolder = path.resolve('./packs/pfs-introductions-bestiary')
const pfs_season_1_bestiaryFolder = path.resolve('./packs/pfs-season-1-bestiary')
const pfs_season_2_bestiaryFolder = path.resolve('./packs/pfs-season-2-bestiary')
const pfs_season_3_bestiaryFolder = path.resolve('./packs/pfs-season-3-bestiary')
const quest_for_the_frozen_flame_bestiaryFolder = path.resolve('./packs/quest-for-the-frozen-flame-bestiary')
const shadows_at_sundown_bestiaryFolder = path.resolve('./packs/shadows-at-sundown-bestiary')
const stolen_fate_bestiaryFolder = path.resolve('./packs/stolen-fate-bestiary')
const strength_of_thousands_bestiaryFolder = path.resolve('./packs/strength-of-thousands-bestiary')
const the_enmity_cycle_bestiaryFolder = path.resolve('./packs/the-enmity-cycle-bestiary')
const the_slithering_bestiaryFolder = path.resolve('./packs/the-slithering-bestiary')
const travel_guide_bestiaryFolder = path.resolve('./packs/travel-guide-bestiary')
const troubles_in_otari_bestiaryFolder = path.resolve('./packs/troubles-in-otari-bestiary')
const hazards_bestiaryFolder = path.resolve('./packs/hazards')

let abomination_vaults_bestiary = {count:0, results:[]}
let age_of_ashes_bestiary = {count:0, results:[]}
let agents_of_edgewatch_bestiary = {count:0, results:[]}
let blog_bestiary = {count:0, results:[]}
let blood_lords_bestiary = {count:0, results:[]}
let book_of_the_dead_bestiary = {count: 0, results: []}
let crown_of_the_kobold_king_bestiary = {count: 0, results: []}
let extinction_curse_bestiary = {count:0, results:[]}
let fall_of_plaguestone = {count:0, results:[]}
let fists_of_the_ruby_phoenix_bestiary = {count:0, results:[]}
let gatewalkers_bestiary = {count:0, results:[]}
let impossible_lands_bestiary = {count:0, results:[]}
let malevolence_bestiary = {count:0, results:[]}
let menace_under_otari_bestiary = {count:0, results:[]}
let monsters_of_myth_bestiary = {count:0, results:[]}
let mwangi_expanse_bestiary = {count:0, results:[]}
let night_of_the_gray_death_bestiary = {count:0, results:[]}
let kingmaker_bestiary = {count:0, results:[]}
let npc_gallery = {count:0, results:[]}
let one_shot_bestiary = {count:0, results:[]}
let outlaws_of_alkenstar_bestiary = {count:0, results:[]}
let pathfinder_dark_archive = {count:0, results:[]}
let pfs_introductions_bestiary = {count:0, results:[]}
let pfs_season_1_bestiary = {count:0, results:[]}
let pfs_season_2_bestiary = {count:0, results:[]}
let pfs_season_3_bestiary = {count:0, results:[]}
let quest_for_the_frozen_flame_bestiary = {count:0, results:[]}
let shadows_at_sundown_bestiary = {count:0, results:[]}
let stolen_fate_bestiary = {count:0, results:[]}
let strength_of_thousands_bestiary = {count:0, results:[]}
let the_enmity_cycle_bestiary = {count:0, results:[]}
let the_slithering_bestiary = {count:0, results:[]}
let travel_guide_bestiary = {count:0, results:[]}
let troubles_in_otari_bestiary = {count:0, results:[]}
let hazards_bestiary = {count: 0, results: []}

let ParseArray = [
    { folder: bestiary1Folder, array: bestiary1, name: "bestiary1" },
    { folder: bestiary2Folder, array: bestiary2, name: "bestiary2" },
    { folder: bestiary3Folder, array: bestiary3, name: "bestiary3" },
    { folder: abomination_vaults_bestiaryFolder, array: abomination_vaults_bestiary, name: "abomination_vaults_bestiary" },
    { folder: agents_of_edgewatch_bestiaryFolder, array: agents_of_edgewatch_bestiary, name: "agents_of_edgewatch_bestiary" },
    { folder: age_of_ashes_bestiaryFolder, array: age_of_ashes_bestiary, name: "age_of_ashes_bestiary" },
    { folder: blog_bestiaryFolder, array: blog_bestiary, name: 'blog_bestiary' },
    { folder: blood_lords_bestiaryFolder, array: blood_lords_bestiary, name: 'blood_lords_bestiary' },
    { folder: book_of_the_dead_bestiaryFolder, array: book_of_the_dead_bestiary, name: 'book_of_the_dead_bestiary' },
    { folder: crown_of_the_kobold_king_bestiaryFolder, array: crown_of_the_kobold_king_bestiary, name: 'crown_of_the_kobold_king_bestiary' },
    { folder: extinction_curse_bestiaryFolder, array: extinction_curse_bestiary, name: 'extinction_curse_bestiary' },
    { folder: fall_of_plaguestoneFolder, array: fall_of_plaguestone, name: 'fall_of_plaguestone' },
    { folder: fists_of_the_ruby_phoenix_bestiaryFolder, array: fists_of_the_ruby_phoenix_bestiary, name: 'fists_of_the_ruby_phoenix_bestiary' },
    { folder: gatewalkers_bestiaryFolder, array: gatewalkers_bestiary, name: 'gatewalkers_bestiary' },
    { folder: impossible_lands_bestiaryFolder, array: impossible_lands_bestiary, name: 'impossible_lands_bestiary' },
    { folder: malevolence_bestiaryFolder, array: malevolence_bestiary, name: 'malevolence_bestiary' },
    { folder: menace_under_otari_bestiaryFolder, array: menace_under_otari_bestiary, name: 'menace_under_otari_bestiary' },
    { folder: monsters_of_myth_bestiaryFolder, array: monsters_of_myth_bestiary, name: 'monsters_of_myth_bestiary' },
    { folder: mwangi_expanse_bestiaryFolder, array: mwangi_expanse_bestiary, name: 'mwangi_expanse_bestiary' },
    { folder: night_of_the_gray_death_bestiaryFolder, array: night_of_the_gray_death_bestiary, name: 'night_of_the_gray_death_bestiary' },
    { folder: kingmaker_bestiaryFolder, array: kingmaker_bestiary, name: 'kingmaker_bestiary' },
    { folder: npc_galleryFolder, array: npc_gallery, name: 'npc_gallery' },
    { folder: one_shot_bestiaryFolder, array: one_shot_bestiary, name: 'one_shot_bestiary' },
    { folder: outlaws_of_alkenstar_bestiaryFolder, array: outlaws_of_alkenstar_bestiary, name: 'outlaws_of_alkenstar_bestiary' },
    { folder: pathfinder_dark_archiveFolder, array: pathfinder_dark_archive, name: 'pathfinder_dark_archive' },
    { folder: pfs_introductions_bestiaryFolder, array: pfs_introductions_bestiary, name: 'pfs_introductions_bestiary' },
    { folder: pfs_season_1_bestiaryFolder, array: pfs_season_1_bestiary, name: 'pfs_season_1_bestiary' },
    { folder: pfs_season_2_bestiaryFolder, array: pfs_season_2_bestiary, name: 'pfs_season_2_bestiary' },
    { folder: pfs_season_3_bestiaryFolder, array: pfs_season_3_bestiary, name: 'pfs_season_3_bestiary' },
    { folder: quest_for_the_frozen_flame_bestiaryFolder, array: quest_for_the_frozen_flame_bestiary, name: 'quest_for_the_frozen_flame_bestiary' },
    { folder: shadows_at_sundown_bestiaryFolder, array: shadows_at_sundown_bestiary, name: 'shadows_at_sundown_bestiary' },
    { folder: stolen_fate_bestiaryFolder, array: stolen_fate_bestiary, name: 'stolen_fate_bestiary' },
    { folder: strength_of_thousands_bestiaryFolder, array: strength_of_thousands_bestiary, name: 'strength_of_thousands_bestiary' },
    { folder: the_enmity_cycle_bestiaryFolder, array: the_enmity_cycle_bestiary, name: 'the_enmity_cycle_bestiary' },
    { folder: the_slithering_bestiaryFolder, array: the_slithering_bestiary, name: 'the_slithering_bestiary' },
    { folder: travel_guide_bestiaryFolder, array: travel_guide_bestiary, name: 'travel_guide_bestiary' },
    { folder: troubles_in_otari_bestiaryFolder, array: troubles_in_otari_bestiary, name: 'troubles_in_otari_bestiary' },
    { folder: hazards_bestiaryFolder, array: hazards_bestiary, name: 'hazards_bestiary' },
]

const BESTIARY_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.BESTIARY_VERSION)

let version = {version: BESTIARY_VERSION, count: 0, name: 'bestiary'}
router.get('/version', async(req, res) => {
    res.send(version)
})

// console.log("Start reading bestiary")
Object.keys(ParseArray).forEach((i) => {
    processBestiary(ParseArray[i].folder, ParseArray[i].array, ParseArray[i].name)

    router.get('/' + ParseArray[i].name, async(req,res)=>{
        // let bestiary = {...ParseArray[i].array}
        // let results = findByMatchingProperties(bestiary.results, req.query)

        // bestiary.results = results
        // bestiary.count = results.length

        res.send(ParseArray[i].array)
    })
})

const finalTimerThreshold = 5000
let finalTimer = null
let totalCount = 0
function processBestiary(folder, array, name) {
    // console.log(folder, array, name)
    let timer = null
    fs.readdir(folder, (err1, files) => {
        if (err1) throw err1;
        array['count'] = files.length
        totalCount += files.length
        version.count += files.length
        
        files.forEach(file => {
            fs.readFile(folder + '/' + file, 'utf8', function(err2, data) {
                if (err2) throw err2;
    
                // console.log('data', data)
                const jsonData = JSON.parse(data)
                // console.log('jsonData', jsonData)
                const obj = parseBeast(jsonData)
                array['results'].push(obj)
                if (finalTimer) {
                    // console.log('Clear timer', file)
                    // console.log('Total Creatures: ', totalCount)
                    clearTimeout(finalTimer)
                }
                finalTimer = setTimeout(() => {
                    // console.log('Total Creatures: ', totalCount)
                    // ParseArray.forEach(pa => {
                    //     console.log(pa.name, pa.array.count)
                    // })

                    // createRoutes()
                }, finalTimerThreshold)
            })
        })
    })
}

function parseBeast(beast) {
    if (beast.flags) { delete beast.flags }
    if (beast.img) { delete beast.img }
    if (beast.token) { delete beast.token }

    if (beast.items && Object.keys(beast.items).length > 0) {
        Object.values(beast.items).forEach((item, i) => {
            beast.items[i] = parseItem(item)
        });
    }

    return beast
}

// TODO: Compendium regex for items & description

const localizeRegex = /\@Localize\[([a-zA-Z0-9\.]+)\]/g

function parseItem(item) {
    if (item.system && item.system.description && item.system.description.value && item.system.description.value.length > 0) {
        if (item.system.description.value.includes('@Localize')) {
            const localizeArray = item.system.description.value.matchAll(localizeRegex)

            let nextLocalize = localizeArray.next()
            while (!nextLocalize.done) {
                
                let localizeKeyArray = nextLocalize.value[1].split('.')
                let newLocalString = null
                newLocalString = getLocalizedChild(localize, localizeKeyArray) || getLocalizedChild(localize_re, localizeKeyArray)

                item.system.description.value = item.system.description.value.replace(nextLocalize.value[0], newLocalString)

                nextLocalize = localizeArray.next()
            }
        }

        item.system.foundryDescription = {value: item.system.description.value}
        item.system.description.value = regexRemove(item.system.description.value)
    }

    return item
}

function getLocalizedChild(obj, children) {
    if (children.length > 0) {
        let nextNode = children.splice(0,1)
        if (!!obj[nextNode[0]]) {
            return getLocalizedChild(obj[nextNode[0]], children)
        } else {
            return null
        }
    } else {
        return obj
    }
}


function findByMatchingProperties(set, properties) {
    return set.filter(function (entry) {
        return Object.keys(properties).every(function (key) {
            
            let ksplit = key.split('.')
            let value = null
            ksplit.forEach((ks,i) => {
                if (i === 0)
                    value = entry[ks]
                else
                    value = value[ks]
            })
            return value.toString() === properties[key];
        });
    });
}

function regexRemove(description) {
    if (!!description.includes('@Template')) {
        description = removeTemplateString(description)
    }
    if (!!description.includes('@Check')) {
        description = removeCheckString(description)
    }
    description = removeDamageString(description)
    description = removeTimeString(description)

    return description
}

// Template
function removeTemplateString(description) {
    let templateRegex = /@Template\[([^\]]+)\](\{[^\}]+\})?/g;

    let matches = description.matchAll(templateRegex);
    let iterator = matches.next();

    while(!iterator.done) {
        let info = iterator.value[1].split('|');
        let newInfo = {};
        info.forEach(i => {
            if (i.includes('type')) {
                newInfo.type = i.split(':')[1];
            } else if (i.includes('distance')) {
                newInfo.distance = i.split(':')[1];
            }
        })

        let replacementText = `${newInfo.distance}-foot ${newInfo.type}`;

        let replaceIndex = description.indexOf(iterator.value[0]);

        description = description.substr(0, replaceIndex) + replacementText + description.substr(replaceIndex + iterator.value[0].length, description.length - (iterator.value.index + iterator.value[0].length));
        iterator = matches.next();
    }

    return description
}

// Check
function removeCheckString(description) {
    let checkRegex = /@Check\[([^\]]+)\](\{[^\}]+\})?/g;

    let matches = description.matchAll(checkRegex);
    let iterator = matches.next();

    while(!iterator.done) {
        let info = iterator.value[1].split('|');
        let newInfo = {};
        info.forEach(i => {
            if (i.includes('type')) {
                newInfo.type = i.split(':')[1];
            } else if (i.includes('dc')) {
                newInfo.dc = i.split(':')[1];
            } else if (i.includes('name')) {
                newInfo.name = i.split(':')[1];
            } else if (i.includes('basic')) {
                newInfo.basic = true
            } else if (i.includes('traits')) {
                newInfo.traits = i.split(':')[1];
            }
        })

        let replacementText = `<span class="skill-check">DC <span class="skill-DC" data-dc="${newInfo.dc}" data-save="${newInfo.type}">${newInfo.dc}</span> ${capitalize(newInfo.type)}</span>`;
        if (!!newInfo.basic) {
            replacementText = `<span class="skill-check">DC <span class="skill-DC" data-dc="${newInfo.dc}" data-save="${newInfo.type}" data-basic="true">${newInfo.dc}</span> basic ${capitalize(newInfo.type)}</span>`;
        }
        if (newInfo.type == 'flat') {
            replacementText = `<span class="skill-check">DC <span class="skill-DC" data-dc="${newInfo.dc}" data-save="${newInfo.type}">${newInfo.dc}</span> ${newInfo.type}</span>`;
        }

        let replaceIndex = description.indexOf(iterator.value[0]);

        description = description.substr(0, replaceIndex) + replacementText + description.substr(replaceIndex + iterator.value[0].length, description.length - (iterator.value.index + iterator.value[0].length));
        iterator = matches.next();
    }
    
    return description
}

function removeDamageString(description) {
    const damageRegex = /\[\[\/r+[^\]\]]+\]{1,}\{([^\}]+)\}/g

    return description.replace(damageRegex, '<b>$1</b>')
}

function removeTimeString(description) {
    const timeRegex = /\[\[\/br+[^\]\]]+\]{1,}\{([^\}]+)\}/g

    return description.replace(timeRegex, '<i>$1</i>')
}

function capitalize(item) {
    return item.charAt(0).toUpperCase() + item.slice(1)
}

const getParsedArray = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(ParseArray)
    }, 20000);
});

module.exports = {
    router: router,
    BestiaryArray: getParsedArray,
    pass: true,
}