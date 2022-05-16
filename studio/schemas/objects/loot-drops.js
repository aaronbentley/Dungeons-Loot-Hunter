export default {
    name: 'lootDrops',
    title: 'Loot drops',
    type: 'array',
    of: [
        {
            type: 'reference',
            to: [
                { type: 'meleeWeapons' },
                { type: 'rangedWeapons' },
                { type: 'armor' },
                { type: 'artifacts' }
            ],
            options: {
                disableNew: true,
                filter: () => {
                    return {
                        filter: 'isUnique != true'
                    }
                }
            }
        }
    ]
}
