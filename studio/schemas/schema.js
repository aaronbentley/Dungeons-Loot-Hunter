// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'
import ancientMobs from './documents/ancient-mobs'
import armors from './documents/armors'
import artifacts from './documents/artifacts'
import enchantments from './documents/enchantments'
import levels from './documents/levels'
import meleeWeapons from './documents/melee-weapons'
import rangedWeapons from './documents/ranged-weapons'
import runes from './documents/runes'
import siteSettings from './documents/site-settings'
import armorTraits from './objects/armor-traits'
import artifactTraits from './objects/artifact-traits'
import dlcItem from './objects/dlc-item'
import eventItem from './objects/event-item'
import lootDrops from './objects/loot-drops'
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
        artifactTraits,
        dlcItem,
        enchantments,
        eventItem,
        levels,
        lootDrops,
        meleeWeapons,
        meleeWeaponStats,
        rangedWeapons,
        rangedWeaponStats,
        runes,
        siteSettings
    ])
})
