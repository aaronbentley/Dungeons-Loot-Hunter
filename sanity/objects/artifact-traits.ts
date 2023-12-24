import { defineType } from 'sanity'

export const artifactTraits = defineType({
    name: 'artifactTraits',
    title: 'Traits',
    type: 'array',
    of: [
        {
            type: 'string'
        }
    ],
    options: {
        list: [
            {
                title: '+1 Soul Gathering',
                value: '+1 Soul Gathering'
            }
        ]
    }
})
