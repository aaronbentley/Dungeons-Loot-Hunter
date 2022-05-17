/**
 * Dungeons Loot Hunter Event Item
 */
import { Tag } from '@chakra-ui/react'
import React from 'react'

const EventItem = ({ data = {} }) => {

    if (!data) {
        return null
    }

    const { isEventItem = false, title = '' } = data

    if (!isEventItem) {
        return null
    }

    return (
        <Tag colorScheme='purple' width='max'>
            {title}
        </Tag>
    )
}

export default EventItem
