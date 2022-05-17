/**
 * Dungeons Loot Hunter DLC Item
 */
import { Tag } from '@chakra-ui/react'
import React from 'react'

const DlcItem = ({ data = {} }) => {
    if (!data) {
        return null
    }

    const { isDlcItem = false, title = '' } = data

    if (!isDlcItem) {
        return null
    }

    return (
        <Tag colorScheme='green' width='max'>
            {title}
        </Tag>
    )
}

export default DlcItem
