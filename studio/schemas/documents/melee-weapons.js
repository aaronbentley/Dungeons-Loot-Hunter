import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='⚔️' />

export default {
    title: 'Melee Weapons',
    name: 'meleeWeapons',
    type: 'document',
    icon: Icon,
    validation: (Rule) =>
        Rule.custom((fields) => {
            if (
                fields.stats === undefined ||
                Object.keys(fields.stats).length === 0
            ) {
                return 'Missing Stats'
            }

            if (fields.runes === undefined || fields.runes.length === 0) {
                return 'Missing Runes'
            }

            return true
        }).warning(),
    groups: [
        {
            name: 'content',
            title: 'Content',
            icon: <Emoji style={{ fontSize: '0.75em' }} symbol='📄' />,
            default: true
        },
        {
            name: 'properties',
            title: 'Properties',
            icon: <Emoji style={{ fontSize: '0.75em' }} symbol='📊' />
        },
        {
            name: 'runes',
            title: 'Runes',
            icon: <Emoji style={{ fontSize: '0.75em' }} symbol='🔮' />
        }
    ],
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Melee Weapon name',
            validation: (Rule) => Rule.required(),
            group: 'content'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule) => Rule.required(),
            group: 'content',
            description: 'Generate a slug from the Title',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Melee Weapon image',
            validation: (Rule) => Rule.required(),
            group: 'content',
            options: {
                hotspot: true
            }
        },
        {
            name: 'stats',
            title: 'Stats',
            type: 'meleeWeaponStats',
            group: 'properties'
        },
        {
            name: 'builtInAbilities',
            title: 'Built-in Abilities',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'enchantments' }],
                    options: {
                        disableNew: true
                    }
                }
            ],
            group: 'properties'
        },
        {
            name: 'isUnique',
            title: 'Is unique?',
            type: 'boolean',
            group: 'properties'
        },
        {
            name: 'variationOf',
            title: 'Unique variation of',
            type: 'reference',
            to: [{ type: 'meleeWeapons' }],
            hidden: ({ parent, document, value }) => {
                if (document.isUnique) {
                    return false
                }
                return true
            },
            options: {
                filter: ({ document }) => {
                    if (document.title) {
                        return {
                            filter: 'title != $title && isUnique != true',
                            params: { title: document.title }
                        }
                    }
                }
            },
            group: 'properties'
        },
        {
            name: 'builtInEnchantments',
            title: 'Built-in Enchantments',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'enchantments' }],
                    options: {
                        disableNew: true
                    }
                }
            ],
            hidden: ({ parent, document, value }) => {
                if (document.isUnique) {
                    return false
                }
                return true
            },
            group: 'properties'
        },
        {
            name: 'runes',
            title: 'Runes',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'runes' }],
                    options: {
                        disableNew: true
                    }
                }
            ],
            group: 'runes'
        },
        {
            name: 'isDlcItem',
            title: 'Is DLC item?',
            type: 'dlcItem',
            group: 'content'
        },
        {
            name: 'isEventItem',
            title: 'Is Event item?',
            type: 'eventItem',
            group: 'content'
        },
        {
            name: 'obtainableOn',
            title: 'Obtainable on',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'levels' }],
                    options: {
                        disableNew: true
                    }
                }
            ],
            validation: (Rule) => Rule.unique(),
            hidden: ({ parent, document, value }) => {
                if (document.isUnique) {
                    return true
                }
                return false
            },
            group: 'content'
        },
        {
            name: 'droppedBy',
            title: 'Dropped by',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'ancientMobs' }],
                    options: {
                        disableNew: true
                    }
                }
            ],
            validation: (Rule) => Rule.max(1),
            hidden: ({ parent, document, value }) => {
                if (document.isUnique) {
                    return true
                }
                return false
            },
            group: 'content'
        },
    ],
    preview: {
        select: {
            title: 'title',
            image: 'image',
            isUnique: 'isUnique',
            stats: 'stats',
            runes: 'runes.0.title',
            isDlcItem: 'isDlcItem',
            isEventItem: 'isEventItem'
        },
        prepare(selection) {
            const {
                title,
                image,
                isUnique,
                stats,
                runes,
                isDlcItem,
                isEventItem
            } = selection

            // Create subtitle string
            let subtitle = ''

            if (stats?._type !== 'meleeWeaponStats') {
                subtitle += '⚠️'
            }

            if (stats === undefined || Object.keys(stats).length === 0) {
                subtitle += '📊'
            }

            if (runes === undefined || runes.length === 0) {
                subtitle += '🔮'
            }

            if ((isUnique !== undefined) & isUnique) {
                subtitle += '🟠'
            }

            if (isDlcItem !== undefined && isDlcItem?.isDlcItem) {
                subtitle += '🟢'
            }

            if (isEventItem !== undefined && isEventItem?.isEventItem) {
                subtitle += '🟣'
            }

            if (stats !== undefined || Object.keys(stats).length !== 0) {
                const { area, power, speed } = stats

                if (area === 1 && (power === 1) & (speed === 1)) {
                    subtitle = '🛑' + subtitle
                }
            }

            return {
                title: title,
                subtitle: subtitle,
                media: image
            }
        }
    }
}
