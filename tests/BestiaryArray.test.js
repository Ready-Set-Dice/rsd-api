const path = require('path')
const BestiaryRoute = require(path.resolve('./route/BestiaryRoute'))

const bestiaryURLEndings = [
    'bestiary1',
    'bestiary2',
    'bestiary3',
    'abomination_vaults_bestiary',
    'age_of_ashes_bestiary',
    'agents_of_edgewatch_bestiary',
    'blog_bestiary',
    'book_of_the_dead_bestiary',
    'extinction_curse_bestiary',
    'fall_of_plaguestone',
    'fists_of_the_ruby_phoenix_bestiary',
    'malevolence_bestiary',
    'menace_under_otari_bestiary',
    'monsters_of_myth_bestiary',
    'mwangi_expanse_bestiary',
    'night_of_the_gray_death_bestiary',
    'npc_gallery',
    'one_shot_bestiary',
    'outlaws_of_alkenstar_bestiary',
    'pfs_introductions_bestiary',
    'pfs_season_1_bestiary',
    'pfs_season_2_bestiary',
    'pfs_season_3_bestiary',
    'quest_for_the_frozen_flame_bestiary',
    'shadows_at_sundown_bestiary',
    'strength_of_thousands_bestiary',
    'the_slithering_bestiary',
    'troubles_in_otari_bestiary'
]

describe('Bestiary Array - Compatibility Test', function () {

    test('Fake test', () => {
        return BestiaryRoute.BestiaryArray.then(data => {
            let pass = BestiaryRoute.pass
            expect(pass).toBeTruthy()
        })
    })

    bestiaryURLEndings.forEach(urlEnding => {
        test(`Test for desired features - ${urlEnding}`, () => {
            return BestiaryRoute.BestiaryArray.then(bdata => {
                bdata.filter(d => { return d.name == urlEnding})[0].array.results.forEach(r => {
                    // console.log(`Testing ${r['name']} with id: ${r['_id']} in book: ${d['name']}`)
                    expect(r).toHaveProperty('_id')
                    expect(r['_id']).toEqual(expect.any(String))
                    expect(r).toHaveProperty('name')
                    expect(r.name).toEqual(expect.any(String))
                    expect(r).toHaveProperty('type')
                    expect(r.type).toEqual(expect.any(String))

                    expect(r).toHaveProperty('system')
                    expect(r).toHaveProperty('items')

                    expect(r).toHaveProperty('system.attributes')
                    expect(r).toHaveProperty('system.details')
                    expect(r).toHaveProperty('system.saves')
                    expect(r).toHaveProperty('system.traits')

                    expect(r).toHaveProperty('system.attributes.ac.value')
                    expect(r.system.attributes.ac.value).toEqual(expect.any(Number))

                    expect(r).toHaveProperty('system.details.level.value')
                    expect(r.system.details.level.value).toEqual(expect.any(Number))

                    if (!!r.system.saves) {
                        if (!!r.system.saves.fortitude) {
                            expect(r).toHaveProperty('system.saves.fortitude.value')
                            expect(r.system.saves.fortitude.value).toEqual(expect.anything())
                        }
                        if (!!r.system.saves.reflex) {
                            expect(r).toHaveProperty('system.saves.reflex.value')
                            expect(r.system.saves.reflex.value).toEqual(expect.anything())
                        }
                        if (!!r.system.saves.will) {
                            expect(r).toHaveProperty('system.saves.will.value')
                            expect(r.system.saves.will.value).toEqual(expect.anything())
                        }
                    }

                    expect(r.items).toEqual(expect.any(Array))
                    // TODO: do item test in a separate test?
                    if (r.items.length > 0) {
                        r.items.forEach(ri => {
                            expect(ri).toHaveProperty('_id')
                            expect(ri['_id']).toEqual(expect.any(String))
                            expect(ri).toHaveProperty('name')
                            expect(ri.name).toEqual(expect.any(String))
                            expect(ri).toHaveProperty('type')
                            expect(ri.type).toEqual(expect.any(String))

                            expect(ri).toHaveProperty('system')

                            if (ri.type == 'action') {
                                expect(ri).toHaveProperty('system.category')
                                if (!!ri.system.category) {
                                    expect(ri.system.category).toEqual(expect.any(String))
                                }
                                expect(ri).toHaveProperty('system.actionType.value')
                                expect(ri.system.actionType.value).toEqual(expect.any(String))
                                expect(ri).toHaveProperty('system.actions.value')
                                if (!!ri.system.actions.value) {
                                    expect(ri.system.actions.value).toEqual(expect.anything())
                                }
                                expect(ri).toHaveProperty('system.description.value')
                                expect(ri.system.description.value).toEqual(expect.any(String))
                            } else if (ri.type == 'lore') {
                                expect(ri).toHaveProperty('system.description.value')
                                expect(ri.system.description.value).toEqual(expect.any(String))
                                expect(ri).toHaveProperty('system.mod.value')
                                expect(ri.system.mod.value).toEqual(expect.any(Number))
                            } else if (ri.type == 'spellcastingEntry') {
                                expect(ri).toHaveProperty('system.slots')
                                expect(ri.system.slots).toEqual(expect.any(Object))
                                if (!!ri.system.spelldc) {
                                    expect(ri).toHaveProperty('system.spelldc.dc')
                                    expect(ri.system.spelldc.dc).toEqual(expect.anything())
                                    if (!!ri.system.spelldc.item) {
                                        expect(ri.system.spelldc.item).toEqual(expect.anything())
                                    }
                                    if (!!ri.system.spelldc.mod) {
                                        expect(ri.system.spelldc.mod).toEqual(expect.anything())
                                    }
                                    if (!!ri.system.spelldc.value) {
                                        expect(ri.system.spelldc.value).toEqual(expect.anything())
                                    }
                                }
                                expect(ri).toHaveProperty('system.tradition.value')
                                expect(ri.system.tradition.value).toEqual(expect.any(String))
                            } else if (ri.type == 'spell') {
                                //  TODO: still need to expand spell use (or not)
                            } else if (ri.type == 'melee') {
                                expect(ri).toHaveProperty('system.attackEffects.value')
                                expect(ri.system.attackEffects.value).toEqual(expect.any(Array))
                                expect(ri).toHaveProperty('system.bonus.value')
                                expect(ri.system.bonus.value).toEqual(expect.any(Number))
                                expect(ri).toHaveProperty('system.damageRolls')
                                expect(ri.system.damageRolls).toEqual(expect.any(Object))
                                expect(ri).toHaveProperty('system.traits.value')
                                expect(ri.system.traits.value).toEqual(expect.any(Array))
                                expect(ri).toHaveProperty('system.weaponType.value')
                                expect(ri.system.weaponType.value).toEqual(expect.any(String))
                            }
                        })
                    }

                    expect(r).toHaveProperty('system.traits.rarity')
                    expect(r.system.traits.rarity).toEqual(expect.any(String))
                    expect(r).toHaveProperty('system.traits.size.value')
                    expect(r.system.traits.size.value).toEqual(expect.any(String))
                    expect(r).toHaveProperty('system.traits.value')
                    expect(r.system.traits.value).toEqual(expect.any(Array))
                    
                    if (r.type == 'npc') {
                        expect(r).toHaveProperty('system.abilities')
                        expect(r).toHaveProperty('system.attributes.hp.max')
                        expect(r.system.attributes.hp.max).toEqual(expect.any(Number))
                        expect(r).toHaveProperty('system.attributes.hp.details')
                        expect(r.system.attributes.hp.details).toEqual(expect.any(String))
                        expect(r).toHaveProperty('system.attributes.perception.value')
                        expect(r.system.attributes.perception.value).toEqual(expect.any(Number))
                        expect(r).toHaveProperty('system.attributes.speed')
                        expect(r.system.attributes.speed).toEqual(expect.anything())

                        if (!!r.system.attributes.immunities) {
                            expect(r.system.attributes.immunities).toEqual(expect.any(Array))
                        }
                        if (!!r.system.attributes.resistances) {
                            expect(r.system.attributes.resistances).toEqual(expect.any(Array))
                        }
                        if (!!r.system.attributes.weaknesses) {
                            expect(r.system.attributes.weaknesses).toEqual(expect.any(Array))
                        }

                        expect(r).toHaveProperty('system.details.alignment.value')
                        expect(r.system.details.alignment.value).toEqual(expect.any(String))
                        expect(r).toHaveProperty('system.details.creatureType')
                        expect(r.system.details.creatureType).toEqual(expect.any(String))
                        if (!!r.system.details.publicNotes) {
                            expect(r.system.details.publicNotes).toEqual(expect.any(String))
                        }

                        expect(r).toHaveProperty('system.traits.languages.custom')
                        expect(r.system.traits.languages.custom).toEqual(expect.any(String))
                        expect(r).toHaveProperty('system.traits.languages.value')
                        expect(r.system.traits.languages.value).toEqual(expect.any(Array))

                        // console.log(`${r['name']} with id: ${r['_id']} in book: ${d['name']}`)
                        if (!!r.system.traits.senses) {
                            if (!!Array.isArray(r.system.traits.senses)) {
                                expect(r.system.traits.senses).toEqual(expect.any(Array))
                            } else {
                                expect(r).toHaveProperty('system.traits.senses.value')
                                expect(r.system.traits.senses.value).toEqual(expect.any(String))
                            }
                        }
                    } else if (r.type == 'hazard') {
                        if (!!r.system.hasHealth) {
                            expect(r).toHaveProperty('system.attributes.hp.max')
                            expect(r.system.attributes.hp.max).toEqual(expect.any(Number))
                            expect(r).toHaveProperty('system.attributes.hp.details')
                            expect(r.system.attributes.hp.details).toEqual(expect.any(String))
                        }

                        expect(r).toHaveProperty('system.attributes.hardness')
                        if (!!r.system.attributes.hardness) {
                            expect(r.system.attributes.hardness).toEqual(expect.any(Number))
                        }
                        expect(r).toHaveProperty('system.attributes.stealth.details')
                        expect(r.system.attributes.stealth.details).toEqual(expect.any(String))
                        expect(r).toHaveProperty('system.attributes.stealth.value')
                        expect(r.system.attributes.stealth.value).toEqual(expect.any(Number))

                        expect(r).toHaveProperty('system.details.description')
                        expect(r.system.details.description).toEqual(expect.any(String))
                    } else if (r.type == 'vehicle') {
                        console.log(`Testing ${r['name']} with id: ${r['_id']}`)
                    } else {
                        console.log(`Testing ${r['name']} with id: ${r['_id']} has unknown type: ${r.type}`)
                    }
                    
                })
            })
        })
    })
});
