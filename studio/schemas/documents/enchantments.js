import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='💎' />

export default {
    title: 'Enchantments',
    name: 'enchantments',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Enchantment name',
            validation: (Rule) => Rule.required()
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
            description: 'Provide Enchantment image',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'applicableTo',
            title: 'Applicable to',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Melee weapons', value: 'meleeWeapons' },
                    { title: 'Ranged weapons', value: 'rangedWeapons' },
                    { title: 'Armor', value: 'armor' }
                ]
            }
        }
    ]
}
