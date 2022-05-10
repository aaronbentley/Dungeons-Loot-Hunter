import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{fontSize: '1.8em'}} symbol="🏺" />

export default {
    title: 'Artifacts',
    name: 'artifacts',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Artifact name',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'Image',
            type: 'image',
            title: 'Image',
            description: 'Provide Artifact image',
            validation: (Rule) => Rule.required()
        }
    ]
}