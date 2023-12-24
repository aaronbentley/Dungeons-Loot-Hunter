import { defineField, defineType } from 'sanity'
import { RunesIcon } from '../components/icons'

export const runes = defineType({
    title: 'Runes',
    name: 'runes',
    type: 'document',
    icon: RunesIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Rune name',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Rune image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'color'
        })
    ]
})
