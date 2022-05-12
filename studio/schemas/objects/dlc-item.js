export default {
    name: 'dlcItem',
    title: 'DLC item',
    type: 'object',
    fields: [
        {
            name: 'isDlcItem',
            title: 'Is DLC item?',
            type: 'boolean'
        },
        {
            name: 'title',
            title: 'DLC Title',
            type: 'string',
            hidden: ({ parent }) => {
                if (parent !== undefined && parent.isDlcItem) {
                    return false
                }
                return true
            },
            options: {
                list: [
                    'Jungle Awakens',
                    'Creeping Winter',
                    'Howling Peaks',
                    'Hidden Depths',
                    'Echoing Void'
                ]
            }
        }
    ]
}
