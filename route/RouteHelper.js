
module.exports.regexRemove = (description) => {
    if (!!description) {
        if (!!description.includes('@UUID')) {
            description = this.removeOldUUIDString(description)
        }
        if (!!description.includes('@UUID')) {
            description = this.removeNewUUIDString(description)
        }
        if (!!description.includes('@Template')) {
            description = this.removeTemplateString(description)
        }
        if (!!description.includes('@Check')) {
            description = this.removeCheckString(description)
        }
        
        description = this.removeDamageString(description)
        description = this.removeTimeString(description)
    }
    
    return description
}

module.exports.removeOldUUIDString = (description) => {
    const compendiumRegex = /@UUID\[(([a-zA-Z0-9\-\:\ \(\)\']+\.?){4,5})\]\{([\.a-zA-Z0-9\-\:\ \(\)\']+)\}/g

    return description.replace(compendiumRegex, '<b data-compendium="$1">$3</b>')
}

module.exports.removeNewUUIDString = (description) => {
    const compendiumRegex = /@UUID\[(([a-zA-Z0-9\-\:\ \(\)\']+\.?){4,5})\]/g

    return description.replace(compendiumRegex, '<b data-compendium="$1">$2</b>')
}

// Template
module.exports.removeTemplateString = (description) => {
    let templateRegex = /@Template\[([^\]]+)\](\{[^\}]+\})?/g;

    let matches = description.matchAll(templateRegex);
    let iterator = matches.next();

    while(!iterator.done) {
        let info = iterator.value[1].split('|');
        let newInfo = {};
        info.forEach(i => {
            if (i.includes('type')) {
                newInfo.type = i.split(':')[1];
            } else if (i.includes('distance')) {
                newInfo.distance = i.split(':')[1];
            }
        })

        let replacementText = `${newInfo.distance}-foot ${newInfo.type}`;

        let replaceIndex = description.indexOf(iterator.value[0]);

        description = description.substr(0, replaceIndex) + replacementText + description.substr(replaceIndex + iterator.value[0].length, description.length - (iterator.value.index + iterator.value[0].length));
        iterator = matches.next();
    }

    return description
}

// Check
module.exports.removeCheckString = (description) => {
    let checkRegex = /@Check\[([^\]]+)\](\{[^\}]+\})?/g;

    let matches = description.matchAll(checkRegex);
    let iterator = matches.next();

    while(!iterator.done) {
        let info = iterator.value[1].split('|');
        let newInfo = {};
        info.forEach(i => {
            if (i.includes('type')) {
                newInfo.type = i.split(':')[1];
            } else if (i.includes('dc')) {
                newInfo.dc = i.split(':')[1];
            } else if (i.includes('name')) {
                newInfo.name = i.split(':')[1];
            } else if (i.includes('basic')) {
                newInfo.basic = true
            } else if (i.includes('traits')) {
                newInfo.traits = i.split(':')[1];
            }
        })

        let replacementText = `<span class="skill-check">DC <span class="skill-DC">${newInfo.dc}</span> ${this.capitalize(newInfo.type)}</span>`;
        if (!!newInfo.basic) {
            replacementText = `<span class="skill-check">DC <span class="skill-DC">${newInfo.dc}</span> basic ${this.capitalize(newInfo.type)}</span>`;
        }
        if (newInfo.type == 'flat') {
            replacementText = `<span class="skill-check">DC ${newInfo.dc} ${newInfo.type}</span>`;
        }

        let replaceIndex = description.indexOf(iterator.value[0]);

        description = description.substr(0, replaceIndex) + replacementText + description.substr(replaceIndex + iterator.value[0].length, description.length - (iterator.value.index + iterator.value[0].length));
        iterator = matches.next();
    }
    
    return description
}


module.exports.removeDamageString = (description) => {
    const damageRegex = /\[\[\/r+[^\]\]]+\]{1,}\{([^\}]+)\}/g

    return description.replace(damageRegex, '<b>$1</b>')
}

module.exports.removeTimeString = (description) => {
    const timeRegex = /\[\[\/br+[^\]\]]+\]{1,}\{([^\}]+)\}/g

    return description.replace(timeRegex, '<i>$1</i>')
}

module.exports.test = () => {
    console.log("Route Helper")
}

module.exports.parseSingle = (c) => {
    if (!!c && !!c.flags) { delete c.flags }
    if (!!c && !!c.img) { delete c.img }

    if (!!c && !!c.system && !!c.system.description) {
        c.system.foundryDescription = {value: c.system.description.value}
        c.system.description.value = this.regexRemove(c.system.description.value)
    }

    return c
}

module.exports.capitalize = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1)
}

module.exports.noParse = (c) => { return c }