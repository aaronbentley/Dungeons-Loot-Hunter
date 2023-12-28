import { defineField, defineType } from 'sanity'
import {
    ArmorsIcon,
    ContentGroupIcon,
    PropertiesGroupIcon,
    RuneGroupIcon
} from '../components/icons'

export const armors = defineType({
    title: 'Armor',
    name: 'armor',
    type: 'document',
    icon: ArmorsIcon,
    validation: (Rule) =>
        Rule.custom((fields) => {
            if (
                fields?.runes === undefined ||
                (Array.isArray(fields?.runes) && fields?.runes.length === 0)
            ) {
                return 'Missing Runes'
            }

            return true
        }).warning(),
    groups: [
        {
            name: 'content',
            title: 'Content',
            icon: ContentGroupIcon,
            default: true
        },
        {
            name: 'properties',
            title: 'Properties',
            icon: PropertiesGroupIcon
        },
        {
            name: 'runes',
            title: 'Runes',
            icon: RuneGroupIcon
        }
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Armor name',
            validation: (Rule) => Rule.required(),
            group: 'content'
        }),
        defineField({
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
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Armor image',
            validation: (Rule) => Rule.required(),
            group: 'content',
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'isFeatured',
            title: 'Is featured?',
            description: 'Feature item on Frontpage?',
            type: 'boolean',
            group: 'content',
            initialValue: false
        }),
        defineField({
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
        }),
        defineField({
            name: 'isUnique',
            title: 'Is unique?',
            type: 'boolean',
            group: 'properties'
        }),
        defineField({
            name: 'variationOf',
            title: 'Unique variation of',
            type: 'reference',
            to: [{ type: 'armor' }],
            hidden: ({ parent, document, value }) => {
                if (document?.isUnique) {
                    return false
                }
                return true
            },
            options: {
                disableNew: true,
                filter: ({ document }) => {
                    if (document?.title) {
                        return {
                            filter: 'title != $title && isUnique != true',
                            params: { title: document.title }
                        }
                    } else {
                        return {
                            filter: 'isUnique != true'
                        }
                    }
                }
            },
            group: 'properties'
        }),
        defineField({
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
                if (document?.isUnique) {
                    return false
                }
                return true
            },
            group: 'properties'
        }),
        defineField({
            name: 'traits',
            title: 'Traits',
            type: 'armorTraits',
            group: 'properties'
        }),
        defineField({
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
        }),
        defineField({
            name: 'dlcItem',
            title: 'DLC item?',
            type: 'dlcItem',
            group: 'content'
        }),
        defineField({
            name: 'eventItem',
            title: 'Event item?',
            type: 'eventItem',
            group: 'content'
        }),
        defineField({
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
                if (document?.isUnique) {
                    return true
                }
                return false
            },
            group: 'content'
        }),
        defineField({
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
                if (document?.isUnique) {
                    return true
                }
                return false
            },
            group: 'content'
        })
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
                subtitle += '📊 '
            }

            if (runes === undefined || runes.length === 0) {
                subtitle += '🔮 '
            }

            if (isUnique !== undefined && isUnique) {
                subtitle += '🟠 '
            }

            if (dlcItem !== undefined && dlcItem?.isDlcItem) {
                subtitle += '🔵 '
            }

            if (eventItem !== undefined && eventItem?.isEventItem) {
                subtitle += '🟣 '
            }

            return {
                title: title,
                subtitle: subtitle,
                media: image
            }
        }
    }
})
