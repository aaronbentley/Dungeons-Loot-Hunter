/**
 * MC Dungeons Loot Hunter DLC Item
 */
import { Heading, Stack, Tag } from '@chakra-ui/react'
import React from 'react'

const DlcItem = ( { data = {} } ) => {
    if ( !data ) {
        return null
    }

    const { isDlcItem = false, title = '' } = data

    if ( !isDlcItem ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
                DLC
            </Heading>
            <Tag colorScheme='blue' width='max'>
                {title}
            </Tag>
        </Stack>
    )
}

export default DlcItem
