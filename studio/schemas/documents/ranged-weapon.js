import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{fontSize: '1.8em'}} symbol="🏹" />

export default {
    title: 'Ranged Weapons',
    name: 'rangedWeapons',
    type: 'document',
    icon: Icon,
    validation: Rule => Rule.custom( fields => {
        if ( fields.stats !== undefined || Object.keys(fields.stats).length === 0 ) {
            return "Missing Stats"
        }

        if ( fields.runes !== undefined || fields.runes.length === 0 ) {
            return "Missing Runes"
        }
        
        return true
    }).warning(),
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Ranged Weapon name',
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
            description: 'Provide Ranged Weapon image',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'stats',
            title: 'Stats',
            type: 'rangedWeaponStats'
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
            to: [ { type: 'rangedWeapons' } ],
            hidden: ({ parent, document, value }) => {
                if ( document.isUnique ) {
                    return false
                }
                return true
            },
            options: {
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
                ]
              }
            ],
            hidden: ({ parent, document, value }) => {
                if ( document.isUnique ) {
                    return false
                }
                return true
            }
        }
    ],
    preview: {
        select: {
            title: 'title',
            image: 'image',
            stats: 'stats',
            runes:  'runes.0.title'
        },
        prepare( selection ) {
            const {
                title,
                image,
                stats,
                runes
            } = selection

            // Create subtitle string
            let subtitle = ''

            if ( stats._type !== 'rangedWeaponStats' ) {
                subtitle += '⚠️'
            }

            if ( stats === undefined || Object.keys(stats).length === 0 ) {
                subtitle += '📊'
            }

            if ( runes === undefined || runes.length === 0 ) {
                subtitle += '🔮'
            }
            
            return {
                title: title,
                subtitle: subtitle,
                media: image
            }
        }
    }
}