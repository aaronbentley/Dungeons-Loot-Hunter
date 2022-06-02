/**
 * MC Dungeons Loot Hunter Built-in enchantments
 */

import { Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const BuiltInEnchantments = ( { data = {} } ) => {
    if ( !data ) {
        return null
    }

    return (
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
    )
}

export default BuiltInEnchantments
