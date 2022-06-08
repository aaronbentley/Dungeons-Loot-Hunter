import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='🛡' />

export default {
    title: 'Armor',
    name: 'armor',
    type: 'document',
    icon: Icon,
    validation: (Rule) =>
        Rule.custom((fields) => {
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
            description: 'Specify Armor name',
            validation: (Rule) => Rule.required(),
            group: 'content'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Generate a slug from the Title',
            validation: (Rule) => Rule.required(),
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Armor image',
            validation: (Rule) => Rule.required(),
            group: 'content',
            options: {
                hotspot: true
            }
        },
        {
            name: 'isFeatured',
            title: 'Is featured?',
            description: 'Feature item on Frontpage?',
            type: 'boolean',
            group: 'content',
            initialValue: false
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
            to: [{ type: 'armor' }],
            hidden: ({ parent, document, value }) => {
                if (document.isUnique) {
                    return false
                }
                return true
            },
            options: {
                disableNew: true,
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
            name: 'traits',
            title: 'Traits',
            type: 'armorTraits',
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
            name: 'dlcItem',
            title: 'DLC item?',
            type: 'dlcItem',
            group: 'content'
        },
        {
            name: 'eventItem',
            title: 'Event item?',
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
        }
    ],
    preview: {
        select: {
            title: 'title',
            image: 'image',
            isUnique: 'isUnique',
            traits: 'traits',
            runes: 'runes.0.title',
            dlcItem: 'dlcItem',
            eventItem: 'eventItem'
        },
        prepare(selection) {
            const {
                title,
                image,
                isUnique,
                traits,
                runes,
                dlcItem,
                eventItem
            } = selection

            // Create subtitle string
            let subtitle = ''

            if (traits === undefined || Object.keys(traits).length === 0) {
                subtitle += '📊'
            }

            if (runes === undefined || runes.length === 0) {
                subtitle += '🔮'
            }

            if ((isUnique !== undefined) & isUnique) {
                subtitle += '🟠'
            }

            if (dlcItem !== undefined && dlcItem?.isDlcItem) {
                subtitle += '🔵'
            }

            if (eventItem !== undefined && eventItem?.isEventItem) {
                subtitle += '🟣'
            }

            return {
                title: title,
                subtitle: subtitle,
                media: image
            }
        }
    }
}
