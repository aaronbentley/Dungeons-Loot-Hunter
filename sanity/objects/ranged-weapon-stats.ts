import { defineType } from 'sanity'

export const rangedWeaponStats = defineType({
    name: 'rangedWeaponStats',
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
            name: 'ammo',
            title: 'Ammo',
            type: 'number',
            validation: (Rule) => Rule.required().min(1).max(14)
        }
    ],
    options: {
        columns: 3
    }
})
