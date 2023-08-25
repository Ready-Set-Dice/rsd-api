const path = require('path')
const RouteHelper = require(path.resolve('./route/RouteHelper'))

const CONDITION_ITEMS_VERSION = 1
const AbstractRoute = new (require(path.resolve('./route/AbstractRoute')))('conditions', CONDITION_ITEMS_VERSION, (c) => {
    if (!!c && !!c.system) {
        if (!!c.system.hud) { delete c.system.hud }
        if (!!c.system.references) { delete c.system.references }
        if (!!c.system.source) { delete c.system.source }
        if (!!c.system.sources) { delete c.system.sources }

        if (!!c.system.description) { 
            c.system.foundryDescription = {value: c.system.description.value}
            c.system.description.value = RouteHelper.regexRemove(c.system.description.value)
        }
    }
    if (!!c && !!c.flags) { delete c.flags }
    if (!!c && !!c.img) { delete c.img }

    return c
})

const typeTest = 'Conditions'
const urlEnding = 'condition'

describe(`${typeTest} - Compatibility Test`, function () {


    test('Initial check', async () => {
        await new Promise((r) => setTimeout(r, 1000));

        expect(AbstractRoute).toHaveProperty('single')
        expect(AbstractRoute.single).toHaveProperty('count')
        expect(AbstractRoute.single).toHaveProperty('results')
        expect(AbstractRoute.single.count).toEqual(expect.any(Number))
        expect(AbstractRoute.single.results).toEqual(expect.any(Array))
    })


    test(`Test for desired features - ${urlEnding}`, async () => {
        await new Promise((r) => setTimeout(r, 1000));

        return AbstractRoute.single.results.forEach(r => {

            expect(r).toHaveProperty('_id')
            expect(r['_id']).toEqual(expect.any(String))
            expect(r).toHaveProperty('name')
            expect(r.name).toEqual(expect.any(String))
            expect(r).toHaveProperty('type')
            expect(r.type).toEqual('condition')

            expect(r).toHaveProperty('system')

            expect(r).toHaveProperty('system.description')
            expect(r).toHaveProperty('system.description.value')
            expect(r).toHaveProperty('system.rules')

            expect(r.system.description.value).toEqual(expect.any(String))
            expect(r.system.rules).toEqual(expect.any(Array))
        })

    })
});