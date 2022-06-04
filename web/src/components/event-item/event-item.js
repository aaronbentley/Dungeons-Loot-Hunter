/**
 * MC Dungeons Loot Hunter Event Item
 */
import { Heading, Stack, Tag } from '@chakra-ui/react'
import React from 'react'

const EventItem = ( { data = {} } ) => {
    if ( !data ) {
        return null
    }

    const { isEventItem = false, title = '' } = data

    if ( !isEventItem ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
                Event
            </Heading>
            <Tag colorScheme='purple' width='max'>
                {title}
            </Tag>
        </Stack>
    )
}

export default EventItem
