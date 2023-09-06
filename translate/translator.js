const fs = require('fs');
const crypto = require('crypto');

class PacksTranslator {
    #PACKROOT;
    #DATAROOT;
    #PACKNAME;
    #PACKPATH;
    #DATAPATH;
    
    constructor(PACKROOT, DATAROOT, STATICPATH, PACKNAME) {
        this.#PACKROOT = PACKROOT;
        this.#DATAROOT = DATAROOT;
        this.#PACKNAME = PACKNAME;
        this.#PACKPATH = `${this.#PACKROOT}/${this.#PACKNAME}`;
        this.#DATAPATH = `${this.#DATAROOT}/${this.#PACKNAME}`;

        const en = JSON.parse(fs.readFileSync(`${STATICPATH}/lang/en.json`));
        const re_en = JSON.parse(fs.readFileSync(`${STATICPATH}/lang/re-en.json`));
        if (!!en && !!re_en) {
            this.parser = new (require('./../.shared/classes/FoundryParser'))(en, re_en);
        }
    }

    async files() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.#PACKPATH, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }

    /**
     * @param {string} name The name of a pack file that needs to be read.
     */
    async readPack(name) {
        return new Promise((resolve, reject) => {
            fs.readFile(`${this.#PACKPATH}/${name}`, 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
        });
    }

    /**
     * @param {string} name The name of a stored file that needs to be read.
     */
    async readStored(name) {
        return new Promise((resolve, reject) => {
            fs.access(`${this.#DATAPATH}/${name}`, fs.F_OK, (err) => {
                if (err) {
                    resolve(false);
                    return;
                }

                fs.readFile(`${this.#DATAPATH}/${name}`, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(JSON.parse(data));
                });
            })
            
        });
    }

    /**
     * @param {*} name The name of a file which we will write to.
     * @param {*} data The JS data that will be written to the file.
     */
    async writeFile(name, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${this.#DATAPATH}/${name}`, JSON.stringify(data), (err) => {
                if (err) reject(err);
                resolve(true);
            });
        });
    }

    hashJSON(data) {
        const hashSum = crypto.createHash('sha1');
        hashSum.update(data);
        return hashSum.digest('hex');
    }
    
    processPack() {console.warn('This function is an abstract.')}
    translateFile() {console.warn('This function is an abstract.')}

}

module.exports = PacksTranslator;