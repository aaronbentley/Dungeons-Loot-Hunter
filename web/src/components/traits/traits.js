/**
 * MC Dungeons Loot Hunter Traits
 */

import { Heading, List, ListIcon, ListItem, Stack } from '@chakra-ui/react'
import React from 'react'
import TraitIcon from '../trait-icon/trait-icon'

const Traits = ( { data = [] } ) => {
    if ( !data || data.length === 0 ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
                Traits
            </Heading>
            <List spacing={2}>
                {data.map( ( trait ) => {
                    return (
                        <ListItem key={trait}>
                            <ListIcon as={TraitIcon} color='gray.400' />
                            {trait}
                        </ListItem>
                    )
                } )}
            </List>
        </Stack>
    )
}

export default Traits
