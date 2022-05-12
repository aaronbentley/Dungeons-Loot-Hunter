// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
import ancientMobs from './documents/ancient-mobs'
import armors from './documents/armor'
import artifacts from './documents/artifact'
import enchantments from './documents/enchantments'
import meleeWeapons from './documents/melee-weapon'
import rangedWeapons from './documents/ranged-weapon'
import runes from './documents/runes'
import siteSettings from './documents/site-settings'
import armorTraits from './objects/armor-traits'
import dlcItem from './objects/dlc-item'
import eventItem from './objects/event-item'
import meleeWeaponStats from './objects/melee-weapon-stats'
import rangedWeaponStats from './objects/ranged-weapon-stats'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: 'default',
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
        /* Your types here! */
        ancientMobs,
        armors,
        armorTraits,
        artifacts,
        dlcItem,
        enchantments,
        eventItem,
        meleeWeapons,
        meleeWeaponStats,
        rangedWeapons,
        rangedWeaponStats,
        runes,
        siteSettings
    ])
})
