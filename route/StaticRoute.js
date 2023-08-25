const express = require('express');
const router = express.Router();
const fs = require('graceful-fs')
const path = require('path')

const localizeFile = path.resolve('./static/lang/en.json')
let localizerawdata = fs.readFileSync(localizeFile)

const localizeREFile = path.resolve('./static/lang/re-en.json')
let localize_rerawdata = fs.readFileSync(localizeREFile)

const STATIC_VERSION = Number(process.env.BASE_VERSION) + Number(process.env.STATIC_VERSION)

let version = {version: STATIC_VERSION, name: 'static'}
router.get('/version', async(req, res) => {
    res.send(version)
})

router.get('/en.json', async(req,res)=>{
    res.send(localizerawdata)
})

router.get('/re-en.json', async(req,res)=>{
    res.send(localize_rerawdata)
})

module.exports = {
    router: router,
    pass: true,
}