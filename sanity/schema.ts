import { type SchemaTypeDefinition } from 'sanity'
import { ancientMobs } from './documents/ancient-mobs'
import { armors } from './documents/armors'
import { artifacts } from './documents/artifacts'
import { enchantments } from './documents/enchantments'
import { levels } from './documents/levels'
import { meleeWeapons } from './documents/melee-weapons'
import { rangedWeapons } from './documents/ranged-weapons'
import { runes } from './documents/runes'
import { siteSettings } from './documents/site-settings'
import { armorTraits } from './objects/armor-traits'
import { artifactTraits } from './objects/artifact-traits'
import { dlcItem } from './objects/dlc-item'
import { eventItem } from './objects/event-item'
import { lootDrops } from './objects/loot-drops'
import { meleeWeaponStats } from './objects/melee-weapon-stats'
import { rangedWeaponStats } from './objects/ranged-weapon-stats'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
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
    ]
}
