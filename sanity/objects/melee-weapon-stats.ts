import { defineType } from 'sanity'

export const meleeWeaponStats = defineType({
    name: 'meleeWeaponStats',
    title: 'Weapon Stats',
    type: 'object',
    fields: [
        {
            name: 'power',
            title: 'Power',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(14)
        },
        {
            name: 'speed',
            title: 'Speed',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(14)
        },
        {
            name: 'area',
            title: 'Area',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(14)
        }
    ],
    options: {
        columns: 3
    }
})
