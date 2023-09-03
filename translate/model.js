import { v4 as uuidv4 } from 'uuid'

class DataModel {
    data = {
        id: null,
        name: null,
        type: null
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

    importJSON(data) {
        this.data = JSON.parse(data); 
    }
}

module.exports = DataModel;