const fs = require('fs');

class PacksTranslator {
    #PACKROOT;
    #DATAROOT;
    #PACKNAME;
    #PACKPATH;
    #DATAPATH;
    
    constructor(PACKROOT, DATAROOT, PACKNAME) {
        this.#PACKROOT = PACKROOT;
        this.#DATAROOT = DATAROOT;
        this.#PACKNAME = PACKNAME;
        this.#PACKPATH = `${this.#PACKROOT}/${this.#PACKNAME}`;
        this.#DATAPATH = `${this.#DATAROOT}/${this.#PACKNAME}`;
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
     * @param {string} name The name of a file that needs to be read.
     */
    async readFile(name) {
        return new Promise((resolve, reject) => {
            fs.readFile(`${this.#PACKPATH}/${name}`, 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data));
            });
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

    processPack() {console.warn('This function is an abstract.')}
    translateFile() {console.warn('This function is an abstract.')}
}

module.exports = PacksTranslator;