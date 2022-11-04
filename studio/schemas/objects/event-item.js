export default {
    name: 'eventItem',
    title: 'Event item',
    type: 'object',
    fields: [
        {
            name: 'isEventItem',
            title: 'Is event item?',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'title',
            title: 'Event Title',
            type: 'string',
            hidden: ({ parent }) => {
                if (parent !== undefined && parent.isEventItem) {
                    return false
                }
                return true
            },
            options: {
                list: [
                    'Spooky Fall',
                    'Chills and Thrills',
                    'Anniversary Event',
                    'Spookier Fall',
                    'Festival of Frost',
                    'Spookiest Fall'
                ]
            }
        }
    ]
}
