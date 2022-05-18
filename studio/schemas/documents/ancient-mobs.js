import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='😈' />

export default {
    title: 'Ancient Mobs',
    name: 'ancientMobs',
    type: 'document',
    icon: Icon,
    validation: Rule => Rule.custom( fields => {
        if ( fields.runeRequirements === undefined || fields.runeRequirements.length === 0 ) {
            return "Missing Rune requirements"
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
            name: 'enchantments',
            title: 'Enchantments',
            icon: <Emoji style={{ fontSize: '0.75em' }} symbol='💎' />
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
            description: 'Specify Ancient Mob name',
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
            description: 'Provide Ancient Mob image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            },
            group: 'content'
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
            validation: (Rule) => Rule.min(1),
            group: 'enchantments'
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
            ],
            group: 'runes'
        }
    ]
}
