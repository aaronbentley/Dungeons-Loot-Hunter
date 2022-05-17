import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='😈' />

export default {
    title: 'Ancient Mobs',
    name: 'ancientMobs',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Ancient Mob name',
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
            description: 'Provide Ancient Mob image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        },
        {
            name: 'enchantments',
            title: 'Enchantments',
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
            validation: (Rule) => Rule.min(1)
        },
        {
            name: 'runeRequirements',
            title: 'Rune requirements',
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
        }
    ]
}
