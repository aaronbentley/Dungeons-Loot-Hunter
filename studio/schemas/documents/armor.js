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
            validation: (Rule) => Rule.required()
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
                            filter: 'title != $title',
                            params: { title: document.title }
                        }
                    }
                }
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
    ]
}