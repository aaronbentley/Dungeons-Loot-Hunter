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
            name: 'Image',
            type: 'image',
            title: 'Image',
            description: 'Provide Armor image',
            validation: (Rule) => Rule.required()
        }
    ]
}