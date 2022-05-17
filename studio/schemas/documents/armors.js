import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{fontSize: '1.8em'}} symbol="🛡" />

export default {
    title: 'Armor',
    name: 'armor',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Armor name',
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
            description: 'Provide Armor image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        },
        {
            name: 'builtInAbilities',
            title: 'Built-in Abilities',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [
                  { type: 'enchantments' }
                ],
                options: {
                    disableNew: true
                }
              }
            ]
        },
        {
            name: 'isUnique',
            title: 'Is unique?',
            type: 'boolean'
        },
        {
            name: 'variationOf',
            title: 'Unique variation of',
            type: 'reference',
            to: [ { type: 'armor' } ],
            validation: (Rule) => Rule.max(1),
            hidden: ({ parent, document, value }) => {
                if ( document.isUnique ) {
                    return false
                }
                return true
            },
            options: {
                disableNew: true,
                filter: ( { document } ) => {
                    if (document.title) {
                        return {
                            filter: 'title != $title && isUnique != true',
                            params: { title: document.title }
                        }
                    }
                }
            }
        },
        {
            name: 'builtInEnchantments',
            title: 'Built-in Enchantments',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [
                  { type: 'enchantments' }
                ],
                options: {
                    disableNew: true
                }
              }
            ],
            hidden: ({ parent, document, value }) => {
                if ( document.isUnique ) {
                    return false
                }
                return true
            }
        },
        {
            name: 'traits',
            title: 'Traits',
            type: 'armorTraits'
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
                        disableNew: true,
                    }
                }
            ],
            validation: (Rule) => Rule.max(1)
        }
    ],
    preview: {
        select: {
            title: 'title',
            image: 'image',
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
                isUnique,
                traits,
                runes,
                isDlcItem,
                isEventItem
            } = selection

            // Create subtitle string
            let subtitle = ''

            if ( traits === undefined || Object.keys(traits).length === 0 ) {
                subtitle += '📊'
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