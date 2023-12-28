import { defineField, defineType } from 'sanity'
import {
    ArtifactsIcon,
    ContentGroupIcon,
    PropertiesGroupIcon,
    RuneGroupIcon
} from '../components/icons'

export const artifacts = defineType({
    title: 'Artifacts',
    name: 'artifacts',
    type: 'document',
    icon: ArtifactsIcon,
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
            description: 'Specify Artifact name',
            validation: (Rule) => Rule.required(),
            group: 'content'
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule) => Rule.required(),
            description: 'Generate a slug from the Title',
            options: {
                source: 'title',
                maxLength: 96
            },
            group: 'content'
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Artifact image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            },
            group: 'content'
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
            name: 'isUnique',
            title: 'Is unique?',
            type: 'boolean',
            group: 'properties'
        }),
        defineField({
            name: 'variationOf',
            title: 'Unique variation of',
            type: 'reference',
            to: [{ type: 'artifacts' }],
            hidden: ({ parent, document, value }) => {
                if (document?.isUnique) {
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
            name: 'requiresSouls',
            title: 'Require souls?',
            type: 'boolean',
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
            name: 'traits',
            title: 'Traits',
            type: 'artifactTraits',
            group: 'properties'
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
            group: 'content'
        })
    ],
    preview: {
        select: {
            title: 'title',
            image: 'image',
            requiresSouls: 'requiresSouls',
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
                requiresSouls,
                isUnique,
                runes,
                dlcItem,
                eventItem
            } = selection

            // Create subtitle string
            let subtitle = ''

            if (requiresSouls !== undefined && requiresSouls) {
                subtitle += '💀 '
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
