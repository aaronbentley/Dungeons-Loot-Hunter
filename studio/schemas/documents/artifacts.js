import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{fontSize: '1.8em'}} symbol="🏺" />

export default {
    title: 'Artifacts',
    name: 'artifacts',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Artifact name',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule) => Rule.required(),
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
            description: 'Provide Artifact image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        },
        {
            name: 'requiresSouls',
            title: 'Require souls?',
            type: 'boolean'
        },
        {
            name: 'isUnique',
            title: 'Is unique?',
            type: 'boolean'
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
            ]
        },
        {
            name: 'traits',
            title: 'Traits',
            type: 'artifactTraits'
        },
        {
            name: 'isDlcItem',
            title: 'Is DLC item?',
            type: 'dlcItem'
        },
        {
            name: 'isEventItem',
            title: 'Is Event item?',
            type: 'eventItem'
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
                        disableNew: true,
                    }
                }
            ],
            validation: (Rule) => Rule.unique()
        }
    ],
    preview: {
        select: {
            title: 'title',
            image: 'image',
            requiresSouls: 'requiresSouls',
            isUnique: 'isUnique',
            traits: 'traits',
            runes:  'runes.0.title',
            isDlcItem: 'isDlcItem',
            isEventItem: 'isEventItem'
        },
        prepare( selection ) {
            const {
                title,
                image,
                requiresSouls,
                isUnique,
                runes,
                isDlcItem,
                isEventItem
            } = selection

            // Create subtitle string
            let subtitle = ''

            if ( requiresSouls !== undefined & requiresSouls ) {
                subtitle += '💀'
            }

            if ( runes === undefined || runes.length === 0 ) {
                subtitle += '🔮'
            }

            if ( isUnique !== undefined & isUnique ) {
                subtitle += '🟠'
            }

            if ( isDlcItem !== undefined && isDlcItem?.isDlcItem ) {
                subtitle += '🟢'
            }
            
            if ( isEventItem !== undefined && isEventItem?.isEventItem ) {
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