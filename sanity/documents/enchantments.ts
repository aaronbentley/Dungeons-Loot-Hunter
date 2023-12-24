import { defineField, defineType } from 'sanity'
import { EnchantmentsIcon } from '../components/icons'

export const enchantments = defineType({
    title: 'Enchantments',
    name: 'enchantments',
    type: 'document',
    icon: EnchantmentsIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Enchantment name',
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
            description: 'Provide Enchantment image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'applicableTo',
            title: 'Applicable to',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Melee weapons', value: 'meleeWeapons' },
                    { title: 'Ranged weapons', value: 'rangedWeapons' },
                    { title: 'Armor', value: 'armor' }
                ]
            }
        })
    ]
})
