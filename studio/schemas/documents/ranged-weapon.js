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
            name: 'Image',
            type: 'image',
            title: 'Image',
            description: 'Provide Ranged Weapon image',
            validation: (Rule) => Rule.required()
        }
    ]
}