const uuidv4 = require('uuid').v4;

class DataModel {
    data = {
        id: null,
        description: null,
        hash: null,
        name: null,
        type: null,
        version: null,
    };

    constructor(name, type) {
        this.data.id = uuidv4();
        this.data.name = name;
        this.data.type = type;
    }

    get asJS() {
        return this.data;
    }

    get asJSON() {
        return JSON.stringify(this.data);
    }

    importJS(data) {
        this.data = data;
    }
    importJSON(data) {
        this.data = JSON.parse(data); 
    }
}

module.exports = DataModel;