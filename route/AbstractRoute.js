const express = require('express');
const fs = require('graceful-fs')

const smallTimerThreshold = 500

function readfiles(ar, name, parseFunction, postParse) {
    fs.readdir(ar.singleFolder, (err1, files) => {
        if (err1) throw err1;

        ar.single.count = files.length
        ar.version.count = files.length
        ar.version.name = name
        
        files.forEach(file => {
            fs.readFile(ar.singleFolder + '/' + file, 'utf8', function(err2, data) {
                if (err2) throw err2;

                const obj = parseFunction(JSON.parse(data))
                ar.single.results.push(obj)

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
        })
    })
}


function AbstractRoute(singleName, version, parseFunction, postParse = null) {
    this.router = express.Router();

    this.singleFolder = `./packs/${singleName}`

    this.single = {count:0, results:[]}
    this.version = {version: version, count: 0}
    this.timer = null

    // console.log(`Start reading ${singleName}`)
    readfiles(this, singleName, parseFunction, postParse)

    this.router.get('/version', async(req, res) => {
        res.send(this.version)
    });
    
    this.router.get('/', async(req,res)=>{
        res.send(this.single)
    });

    return this
} 

module.exports = AbstractRoute;