const express = require('express');
const fs = require('graceful-fs')

const smallTimerThreshold = 500

function readfile(ar, name, parseFunction, postParse) {

    ar.version.name = name
    
    fs.readFile(ar.singleFile, 'utf8', function(err, data) {
        if (err) throw err;

        const obj = parseFunction(JSON.parse(data))
        if (!!obj && !!obj._id && !!obj.pages && obj.pages.length > 0) {
            ar.single.count = obj.pages.length
            ar.version.count = obj.pages.length

            Object.values(obj.pages).forEach((page) => {
                if (!!page && !!page._id) {
                    ar.single.results.push(page)
                }

                if (ar.timer) {
                    clearTimeout(ar.timer)
                }
                ar.timer = setTimeout(() => {
                    console.log(`${name} loaded: `, ar.single.results.length, ar.single.count)
                    if (typeof postParse == 'function') {
                        postParse(ar)
                    }
                }, smallTimerThreshold)
            })
        }
    })
}


function JournalRoute(singleName, version, parseFunction, postParse = null) {
    this.router = express.Router();

    this.singleFile = `./packs/journals/${singleName}.json`

    this.single = {count:0, results:[]}
    this.version = {version: version, count: 0}
    this.timer = null

    // console.log(`Start reading ${singleName}`)
    readfile(this, singleName, parseFunction, postParse)

    this.router.get('/version', async(req, res) => {
        res.send(this.version)
    });
    
    this.router.get('/', async(req,res)=>{
        res.send(this.single)
    });

    return this
} 

module.exports = JournalRoute;