import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='🔮' />

export default {
    title: 'Runes',
    name: 'runes',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Rune name',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Rune image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        },
        {
            name: 'color',
            title: 'Color',
            type: 'color',
        }
    ]
}