const PacksTranslator = require('./translator');
const DataModel = require('./model');

class ConditionModel extends DataModel {
    constructor(name) {
        super(name, 'condition');
        this.data.effects = null;
        this.data.overrides = null;
        this.data.hasValue = null;
    }
}

const FLATMODIFIER_RULE = {
    key: 'FLATMODIFIER',
    affects: null,
    type: null,
    value: null
};

const IMMUNITY_RULE = {
    key: 'IMMUNITY',
    type: null,  
};

const AFFECTS_WHITELIST = ['ac','all','attack-roll','cha-based','con-based','dex-based','hp','int-based','perception','reflex','saving-throw','skill-check','str-based','str-damage','wis-based'];
const TYPE_WHITELIST = ['auditory','circumstance','status','visual']

class ConditionsTranslator extends PacksTranslator {
    constructor(PACKROOT, DATAROOT, STATICPATH) {
        super(PACKROOT, DATAROOT, STATICPATH, 'conditions');
    }

    processPack() {
        this.files()
            .then((filesNames) => {
                filesNames.forEach((name) => {
                    this.readPack(name)
                        .then((packData) => {
                            // console.log(filedata);
                            // const condition = new ConditionModel(filedata.name);

                            this.readStored(name)
                                .then((storedData) => {
                                    let condition = null;
                                    // We already have a stored version
                                    if (!!storedData) {
                                        condition = new ConditionModel(storedData.name);
                                        condition.importJS(storedData);
                                        // Compare the stored with packData?
                                    } else {
                                        condition = new ConditionModel(packData.name);

                                        let newData = this.translateFile(packData);

                                        // console.log(condition);
                                    }
                                })
                                .catch((err) => console.error(err));


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

    translateFile(packData) {
        let translatedData = {
            description: null,
            effects: null,
            hash: null,
            hasValue: null,
            overrides: null
        };

        try {
            if (!packData || !packData.system) {
                throw new Error('Packdata not valid or system property no longer exists.');
            }

            const hash = this.hashJSON(JSON.stringify(packData));
            translatedData.hash = hash;

            const description = this.parser.parseItem(packData);
            if (!description.includes('$') && !description.includes('@')) {
                translatedData.description = description;
            } else {
                throw new Error('Unsuccesful description parse, detected $ or @ symbols.');
            }

            const overrides = !!packData.system.overrides ? packData.system.overrides : null;
            if (!!overrides && typeof(overrides) == 'object') {
                translatedData.overrides = overrides;
            } else {
                throw new Error('Overrides field is missing or no longer an object/array.');
            }

            const hasValue = !!packData.system.value && typeof(packData.system.value.isValued) != 'undefined' ? packData.system.value.isValued : null;
            if (!!hasValue && typeof(hasValue) == 'boolean') {
                translatedData.hasValue = hasValue;
            } else {
                throw new Error('System.value or system.value.isValued are missing or no longer a boolean.');
            }

            const effects = this.parseEffects(packData);
        } catch(e) {
            console.error(e);
        }
    

    }

    parseEffects(packData) {
        if (!!this.hasRules(packData)) {
            let effects = [];
            Object.values(packData.system.rules).forEach((rule) => {
                if (!!rule && !!rule.key) {
                    if (rule.key.toLowerCase() == 'flatmodifier') {
                        const affects = rule.selector.toLowerCase();
                        if (!!affects && typeof(affects) == 'string') {
                            if (!AFFECTS_WHITELIST.includes(affects)) { throw new Error(`Selector ${affects} is not in the whitelist.`); }
                        } else if (!!affects && typeof(affects) == 'object') {
                            affects.forEach(r => {
                                if (!AFFECTS_WHITELIST.includes(r)) { throw new Error(`Selector ${r} is not in the whitelist.`); }
                            })
                        } else {
                            throw new Error('Unknown type for affects or no longer exists');
                        }

                        const type = rule.type.toLowerCase();
                        if (!!type && typeof(type) == 'string') {
                            if (!TYPE_WHITELIST.includes(type)) { throw new Error(`Type ${type} is not in the whitelist.`); }
                        }

                        let value = rule.value;


                        if (typeof(value) == 'number') {
                            effects.push({
                                ...FLATMODIFIER_RULE,
                                affects: affects,
                                type: type,
                                number: true,
                                value: value
                            });
                        } else {
                            value = value.replaceAll('@actor.level','@combatant_level');
                            value = value.replaceAll('@item.badge.level','@condition_value');

                            effects.push({
                                ...FLATMODIFIER_RULE,
                                affects: affects,
                                type: type,
                                number: false,
                                value: value
                            });
                        }
                    } else if (rule.key.toLowerCase() == 'immunity') {
                        const type = rule.type.toLowerCase();

                        effects.push({
                            ...IMMUNITY_RULE,
                            type: type,
                        });

                    } else if (rule.key.toLowerCase() == 'grantitem') {
                        const type = rule.type.toLowerCase();

                        effects.push({
                            ...IMMUNITY_RULE,
                            type: type,
                        });

                    } else {
                        console.warn('Unrecognized key during rule parsing.');
                    }
                } else {
                    throw new Error('Rule is invalid or key field no longer exists');
                }
            })
        } else {
            return [];
        }
    }

    hasRules(packData) {
        return !!packData && !!packData.system && !!packData.system.rules && packData.system.rules.length > 0
    }
}

module.exports = ConditionsTranslator;