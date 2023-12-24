import { defineField, defineType } from 'sanity'
import {
    AncientMobsIcon,
    ContentGroupIcon,
    EnchantmentGroupIcon,
    RuneGroupIcon
} from '../components/icons'

export const ancientMobs = defineType({
    title: 'Ancient Mobs',
    name: 'ancientMobs',
    type: 'document',
    icon: AncientMobsIcon,
    validation: (Rule) =>
        Rule.custom((fields) => {
            if (
                fields?.runeRequirements === undefined ||
                (Array.isArray(fields?.runeRequirements) &&
                    fields?.runeRequirements?.length === 0)
            ) {
                return 'Missing Rune requirements'
            }

            return true
        }).warning(),
    groups: [
        {
            name: 'content',
            title: 'Content',
            icon: ContentGroupIcon,
            default: true
        },
        {
            name: 'enchantments',
            title: 'Enchantments',
            icon: EnchantmentGroupIcon
        },
        {
            name: 'runes',
            title: 'Runes',
            icon: RuneGroupIcon
        }
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Specify Ancient Mob name',
            validation: (Rule) => Rule.required(),
            group: 'content'
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
            },
            group: 'content'
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Provide Ancient Mob image',
            validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            },
            group: 'content'
        }),
        defineField({
            name: 'enchantments',
            title: 'Enchantments',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'enchantments' }],
                    options: {
                        disableNew: true
                    }
                }
            ],
            validation: (Rule) => Rule.min(1),
            group: 'enchantments'
        }),
        defineField({
            name: 'runeRequirements',
            title: 'Rune requirements',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'runes' }],
                    options: {
                        disableNew: true
                    }
                }
            ],
            group: 'runes'
        })
    ]
})
