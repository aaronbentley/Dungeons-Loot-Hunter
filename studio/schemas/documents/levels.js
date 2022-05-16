import Emoji from 'a11y-react-emoji'
import React from 'react'

const Icon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='🗺' />

export default {
    title: 'Levels',
    name: 'levels',
    type: 'document',
    icon: Icon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Level name',
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
            description: 'Provide Level image',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'location',
            title: 'Location',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Mainland', value: 'mainland' },
                    { title: 'Island Realm', value: 'island-realm' },
                    { title: 'Other Dimmensions', value: 'other-dimmensions' }
                ]
            }
        },
        {
            name: 'isDlc',
            title: 'DLC content?',
            type: 'boolean'
        },
        {
            name: 'lootDrops',
            title: 'Loot drops',
            type: 'lootDrops'
        },
        {
            name: 'dlcTitle',
            title: 'DLC Title',
            type: 'string',
            hidden: ({ parent }) => {
                if (parent !== undefined && parent.isDlc) {
                    return false
                }
                return true
            },
            options: {
                list: [
                    'Creeping Winter',
                    'Echoing Void',
                    'Flames of the Nether',
                    'Hidden Depths',
                    'Howling Peaks',
                    'Jungle Awakens'
                ]
            }
        }
    ]
}
