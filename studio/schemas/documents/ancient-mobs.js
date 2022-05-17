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
