/**
 * Site Settings - Singleton pattern
 *
 */

export default {
    title: 'Site Settings',
    name: 'siteSettings',
    type: 'document',
    __experimental_actions: [
        'update',
        // 'create',
        // 'delete',
        'publish'
    ],
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'Specify a Title for your Site',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'description',
            title: 'Site Description',
            type: 'text',
            description: 'Describe your site for search engines and social media',
            rows: 4,
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'primaryColor',
            title: 'Primary brand color',
            type: 'color',
            description: 'Select Primary Brand color',
        },
        {
            name: 'secondaryColor',
            title: 'Secondary brand color',
            type: 'color',
            description: 'Select Secondary Brand color',
        }
    ]
}
