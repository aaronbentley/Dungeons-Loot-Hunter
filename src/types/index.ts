import { SanityImageAssetDocument } from '@sanity/client/stega'
import { ColorDefinition } from '@sanity/color-input'
import { ObjectField, Slug } from 'sanity'

/**
 * Documents
 */
type SanityDocument = {
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
}

export type MeleeWeapon = SanityDocument & {
    _type: 'meleeWeapons'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    isFeatured: boolean
    stats: MeleeWeaponStats
    builtInAbilities: Enchantment[]
    isUnique: boolean
    variationOf: MeleeWeapon
    builtInEnchantments: Enchantment[]
    runes: Rune[]
    dlcItem: DlcItem
    eventItem: EventItem
    obtainableOn: {
        levels: Level[]
    }
    droppedBy: {
        ancientMobs: AncientMob[]
    }
}

export type RangedWeapon = SanityDocument & {
    _type: 'rangedWeapons'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    isFeatured: boolean
    stats: RangedWeaponStats
    builtInAbilities: Enchantment[]
    isUnique: boolean
    variationOf: RangedWeapon
    builtInEnchantments: Enchantment[]
    runes: Rune[]
    dlcItem: DlcItem
    eventItem: EventItem
    obtainableOn: {
        levels: Level[]
    }
    droppedBy: {
        ancientMobs: AncientMob[]
    }
}

export type Armor = SanityDocument & {
    _type: 'armor'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    isFeatured: boolean
    builtInAbilities: Enchantment[]
    isUnique: boolean
    variationOf: Armor
    builtInEnchantments: Enchantment[]
    traits: ArmorTraits
    runes: Rune[]
    dlcItem: DlcItem
    eventItem: EventItem
    obtainableOn: {
        levels: Level[]
    }
    droppedBy: {
        ancientMobs: AncientMob[]
    }
}

export type Artifact = SanityDocument & {
    _type: 'artifacts'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    isFeatured: boolean
    isUnique: boolean
    variationOf: Artifact
    requiresSouls: boolean
    runes: Rune[]
    traits: ArtifactTraits
    dlcItem: DlcItem
    eventItem: EventItem
    obtainableOn: {
        levels: Level[]
    }
    droppedBy: {
        ancientMobs: AncientMob[]
    }
}

type Enchantment = SanityDocument & {
    _type: 'enchantments'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    applicableTo: ('meleeWeapons' | 'rangedWeapons' | 'armor')[]
}

export type Level = SanityDocument & {
    _type: 'levels'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    location: ('mainland' | 'island-realm' | 'other-dimmensions')[]
    isDlc: DlcItem
    dlcTitle: string
}

type Rune = SanityDocument & {
    _type: 'runes'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    color: ColorDefinition
}

export type AncientMob = SanityDocument & {
    _type: 'ancientMobs'
    title: string
    slug: Slug
    image: SanityImageAssetDocument
    enchantments: Enchantment[]
    runeRequirements: Rune[]
    lootDrops: LootDrops
}

/**
 * Objects
 */

type SanityObject = {
    _type: ObjectField
}

type ArmorTraits = SanityObject & {
    _type: 'armorTraits'
    traits: string[]
}

type ArtifactTraits = SanityObject & {
    _type: 'artifactTraits'
    traits: string[]
}

type DlcItem = SanityObject & {
    _type: 'dlcItem'
    isDlcItem: boolean
    title:
        | 'Creeping Winter'
        | 'Echoing Void'
        | 'Flames of the Nether'
        | 'Hidden Depths'
        | 'Howling Peaks'
        | 'Jungle Awakens'
}

type EventItem = SanityObject & {
    _type: 'eventItem'
    isEventItem: boolean
    title:
        | 'Anniversary Event'
        | 'Chills and Thrills'
        | 'Festival of Frost'
        | 'Spookier Fall'
        | 'Spookiest Fall'
        | 'Spooky Fall'
}

type LootDrops = SanityObject & {
    _type: 'lootDrops'
    lootDrops: (MeleeWeapon | RangedWeapon | Armor | Artifact)[]
}

type MeleeWeaponStats = SanityObject & {
    _type: 'meleeWeaponStats'
    power: number
    speed: number
    area: number
}

type RangedWeaponStats = SanityObject & {
    _type: 'rangeWeaponStats'
    power: number
    speed: number
    ammo: number
}
