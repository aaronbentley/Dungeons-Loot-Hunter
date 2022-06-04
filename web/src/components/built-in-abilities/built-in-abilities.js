/**
 * MC Dungeons Loot Hunter Built-in abilities
 */

import { Heading, Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const BuiltInAbilities = ( { data = {} } ) => {
    if ( !data || data.length === 0 ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
                                            Built-in Abilities
            </Heading>
            <Stack direction='row' spacing={2}>
                {data &&
                data.map( ( enchantment ) => (
                    <Tooltip
                        key={enchantment.id}
                        label={enchantment.title}
                        placement='top'
                        
                        shouldWrapChildren>
                        <Image
                            imageData={enchantment.image}
                            alt={enchantment.title}
                            width={50} />
                    </Tooltip>
                ) )}
            </Stack>
        </Stack>
    )
}

export default BuiltInAbilities
