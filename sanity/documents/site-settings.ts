import { defineField, defineType } from 'sanity'
import { SiteSettingsIcon } from '../components/icons'

export const siteSettings = defineType({
    title: 'Site Settings',
    name: 'siteSettings',
    type: 'document',
    icon: SiteSettingsIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'Specify a Title for your Site',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
            description:
                'Describe your site for search engines and social media',
            rows: 4,
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Provide logo for your site',
            // validation: (Rule) => Rule.required(),
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: 'primaryColor',
            title: 'Primary brand color',
            type: 'color',
            description: 'Select Primary Brand color'
        }),
        defineField({
            name: 'secondaryColor',
            title: 'Secondary brand color',
            type: 'color',
            description: 'Select Secondary Brand color'
        })
    ]
})
