/**
 * MC Dungeons Loot Hunter Built-in enchantments
 */

import { Heading, Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const BuiltInEnchantments = ( { data = {} } ) => {
    if ( !data ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
                Enchantments
            </Heading>
            <Stack direction='row' spacing={0}>
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
                            width={75} />
                    </Tooltip>
                ) )}
            </Stack>
        </Stack>
    )
}

export default BuiltInEnchantments
