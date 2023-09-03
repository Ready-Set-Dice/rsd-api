const PacksTranslator = require('./translator');
const DataModel = require('./model');

class ConditionModel extends DataModel {

}

class ConditionsTranslator extends PacksTranslator {
    constructor(PACKROOT, DATAROOT) {
        super(PACKROOT, DATAROOT, 'conditions');
    }

    processPack() {
        this.files()
            .then((filesNames) => {
                filesNames.forEach((name) => {
                    this.readFile(name)
                        .then((filedata) => {
                            console.log(filedata);
                        })
                        .catch((err) => console.error(err));
                });
            })
            .catch((err) => console.error(err));
        // files.forEach(file => {
        //     const data = this.readFile(file);

        //     console.log('data', data);
        // })
    }

    translateFile() {

    }
}

module.exports = ConditionsTranslator;