import { defineField, defineType } from 'sanity'
import { LevelsIcon } from '../components/icons'

export const levels = defineType({
    title: 'Levels',
    name: 'levels',
    type: 'document',
    icon: LevelsIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Level name',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            validation: (Rule) => Rule.required(),
            description: 'Generate a slug from the Title',
            options: {
                source: 'title',
                maxLength: 96
            }
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Level image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        }),
        defineField({
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
        }),
        defineField({
            name: 'isDlc',
            title: 'DLC content?',
            type: 'boolean'
        }),
        defineField({
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
        })
    ]
})
