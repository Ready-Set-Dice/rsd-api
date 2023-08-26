const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const port = 3000;

require('dotenv').config()
const cors = require('cors');

let dev = process.env.NODE_ENV !== "development" ? false : true
console.log("dev:", dev)

let whitelist = ['https://pc.readysetdice.com', 'https://gm.readysetdice.com','https://pc-dev.readysetdice.com', 'https://gm-dev.readysetdice.com']
if (!!dev) {
    whitelist = ['http://localhost:9091', 'http://localhost:9092']
}
const corsOptions = {
    origin: function (origin, callback) {
        // console.log(origin, whitelist.indexOf(origin), whitelist)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
};

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.all('*', (req,res,next) => {
    // console.log(req.headers);
    if (req.headers.authorization === 'f356ec2e-9827-4e8f-8f67-4b744080ebbb')
        next()
    else
        res.sendStatus(403)
})

app.get('/alive', (req,res)=>{
    res.send("OK");
});

// const Routes = require('./route')
// app.use('/', Routes)

// Routes
const RouteHelper = require(path.resolve('./route/RouteHelper'))

// Special Routes 
const BestiaryRoute = require(path.resolve('./route/BestiaryRoute')).router
app.use('/bestiary', BestiaryRoute);

// Standardized Routes
const ACTIONS_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.ACTIONS_VERSION)
const ActionsRoute = new (require(path.resolve('./route/AbstractRoute')))('actions', ACTIONS_VERSION, RouteHelper.parseSingle)
app.use('/actions', ActionsRoute.router);

const ANCESTRIES_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.ANCESTRIES_VERSION)
const AncestriesRoute = new (require(path.resolve('./route/AbstractRoute')))('ancestries', ANCESTRIES_VERSION, RouteHelper.parseSingle)
app.use('/ancestries', AncestriesRoute.router);

const ANCESTRIES_FEATURES_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.ANCESTRIES_FEATURES_VERSION)
const AncestryFeaturesRoute = new (require(path.resolve('./route/AbstractRoute')))('ancestryfeatures', ANCESTRIES_FEATURES_VERSION, RouteHelper.parseSingle)
app.use('/ancestryfeatures', AncestryFeaturesRoute.router);

// const ARCHETYPES_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.ARCHETYPES_VERSION)
// const ArchetypesRoute = new (require(path.resolve('./route/AbstractRoute')))('archetypes', ARCHETYPES_VERSION, (c) => {
//     if (!!c) {
//         if (!!c.flags) { delete c.flags }

//         if (!!c.content) { c.content = RouteHelper.regexRemove(c.content) }
//     }

//     return c
// })
// app.use('/archetypes', ArchetypesRoute.router);

const BACKGROUNDS_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.BACKGROUNDS_VERSION)
const BackgroundsRoute = new (require(path.resolve('./route/AbstractRoute')))('backgrounds', BACKGROUNDS_VERSION, RouteHelper.parseSingle)
app.use('/backgrounds', BackgroundsRoute.router);

const CLASSES_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.CLASSES_VERSION)
const ClassesRoute = new (require(path.resolve('./route/AbstractRoute')))('classes', CLASSES_VERSION, RouteHelper.parseSingle)
app.use('/classes', ClassesRoute.router);

// const ClassesExtendedRoute = new (require('./route/AbstractRoute'))('classes-extended', 1, RouteHelper.noParse)
// app.use('/classes-extended', ClassesExtendedRoute.router);

const CLASS_FEATURES_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.CLASS_FEATURES_VERSION)
const ClassFeaturesRoute = new (require(path.resolve('./route/AbstractRoute')))('classfeatures', CLASS_FEATURES_VERSION, RouteHelper.parseSingle)
app.use('/classfeatures', ClassFeaturesRoute.router);

const CONDITION_ITEMS_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.CONDITION_ITEMS_VERSION)
const ConditionsRoute = new (require(path.resolve('./route/AbstractRoute')))('conditions', CONDITION_ITEMS_VERSION, (c) => {
    if (!!c && !!c.system) {
        if (!!c.system.hud) { delete c.system.hud }
        if (!!c.system.references) { delete c.system.references }
        if (!!c.system.source) { delete c.system.source }
        if (!!c.system.sources) { delete c.system.sources }

        if (!!c.system.description) { 
            c.system.foundryDescription = {value: c.system.description.value}
            c.system.description.value = RouteHelper.regexRemove(c.system.description.value)
        }
    }
    if (!!c && !!c.flags) { delete c.flags }
    if (!!c && !!c.img) { delete c.img }

    return c
})
app.use('/condition', ConditionsRoute.router);

const DEITIES_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.DEITIES_VERSION)
const DeitiesRoute = new (require(path.resolve('./route/AbstractRoute')))('deities', DEITIES_VERSION, RouteHelper.parseSingle)
app.use('/deities', DeitiesRoute.router);

const DOMAINS_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.DOMAINS_VERSION)
const DomainsRoute = new (require(path.resolve('./route/JournalRoute')))('domains', DOMAINS_VERSION, (c) => {
    if (!!c && !!c.text && !!c.text.content) {
        c.foundryContent = c.text.content
        c.content = RouteHelper.regexRemove(c.text.content)
    }

    return c
})
app.use('/domains', DomainsRoute.router);

const FEATS_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.FEATS_VERSION)
const FeatsRoute = new (require(path.resolve('./route/AbstractRoute')))('feats', FEATS_VERSION, RouteHelper.parseSingle)
app.use('/feats', FeatsRoute.router);

const HERITAGES_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.HERITAGES_VERSION)
const HeritagesRoute = new (require(path.resolve('./route/AbstractRoute')))('heritages', HERITAGES_VERSION, RouteHelper.parseSingle)
app.use('/heritages', HeritagesRoute.router);

const SPELLS_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.SPELLS_VERSION)
const SpellsRoute = new (require(path.resolve('./route/AbstractRoute')))('spells', SPELLS_VERSION, RouteHelper.parseSingle)
app.use('/spells', SpellsRoute.router);

const SPELLS_EFFECTS_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.SPELLS_EFFECTS_VERSION)
const SpellEffectsRoute = new (require(path.resolve('./route/AbstractRoute')))('spell-effects', SPELLS_EFFECTS_VERSION, (c) => {
    if (!!c && !!c.system) {
        if (!!c.system.tokenIcon) { delete c.system.tokenIcon }
        if (!!c.system.description) {
            c.system.foundryDescription = {value: c.system.description.value}
            c.system.description.value = RouteHelper.regexRemove(c.system.description.value)
        }
    }

    if (!!c && !!c.flags) { delete c.flags }
    if (!!c && !!c.img) { delete c.img }

    return c
})
app.use('/spell-effects', SpellEffectsRoute.router);

const StaticRoute = require(path.resolve('./route/StaticRoute')).router
app.use('/static', StaticRoute);

app.listen(port, ()=> {
    console.log("Listening on port ",port);
});
