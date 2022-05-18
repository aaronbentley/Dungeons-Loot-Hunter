import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{fontSize: '1.8em'}} symbol="🏺" />

export default {
    title: 'Artifacts',
    name: 'artifacts',
    type: 'document',
    icon: Icon,
    validation: Rule => Rule.custom( fields => {
        if ( fields.runes === undefined || fields.runes.length === 0 ) {
            return "Missing Runes"
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
            description: 'Specify Artifact name',
            validation: (Rule) => Rule.required(),
            group: 'content'
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
            },
            group: 'content'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Artifact image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            },
            group: 'content'
        },
        {
            name: 'requiresSouls',
            title: 'Require souls?',
            type: 'boolean',
            group: 'properties'
        },
        {
            name: 'isUnique',
            title: 'Is unique?',
            type: 'boolean',
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
            name: 'traits',
            title: 'Traits',
            type: 'artifactTraits',
            group: 'properties'
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
                        disableNew: true,
                    }
                }
            ],
            validation: (Rule) => Rule.unique(),
            group: 'content'
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