import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{fontSize: '1.8em'}} symbol="⚔️" />

export default {
    title: 'Melee Weapons',
    name: 'meleeWeapons',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Melee Weapon name',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'Image',
            type: 'image',
            title: 'Image',
            description: 'Provide Melee Weapon image',
            validation: (Rule) => Rule.required()
        }
    ]
}