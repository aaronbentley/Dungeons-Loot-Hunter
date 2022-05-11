import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{fontSize: '1.8em'}} symbol="🏹" />

export default {
    title: 'Ranged Weapons',
    name: 'rangedWeapons',
    type: 'document',
    icon: Icon,
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
            type: 'weaponStats'
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
                            filter: 'title != $title',
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
    ]
}