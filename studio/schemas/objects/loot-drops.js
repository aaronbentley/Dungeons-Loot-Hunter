export default {
    name: 'lootDrops',
    title: 'lootDrops',
    type: 'array',
    of: [
        {
            name: 'Melee Weapons',
            type: 'reference',
            to: [{ type: 'meleeWeapons' }],
            options: {
                disableNew: true,
                filter: () => {
                    return {
                        filter: 'isUnique != true'
                    }
                }
            }
        },
        {
            name: 'Ranged Weapons',
            type: 'reference',
            to: [{ type: 'rangedWeapons' }],
            options: {
                disableNew: true,
                filter: () => {
                    return {
                        filter: 'isUnique != true'
                    }
                }
            }
        },
        {
            name: 'Armor',
            type: 'reference',
            to: [{ type: 'armor' }],
            options: {
                disableNew: true,
                filter: () => {
                    return {
                        filter: 'isUnique != true'
                    }
                }
            }
        },
        {
            name: 'Artifact',
            type: 'reference',
            to: [{ type: 'artifacts' }],
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
