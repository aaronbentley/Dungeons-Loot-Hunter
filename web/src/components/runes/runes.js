/**
 * MC Dungeons Loot Hunter Runes
 */
import { Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const Runes = ( { data = {} } ) => {
    if ( !data ) {
        return null
    }

    return (
        <Stack direction='row' spacing={2}>
            {data &&
                data.map( ( rune ) => (
                    <Tooltip
                        key={rune.id}
                        label={rune.title}
                        placement='top'
                        
                        shouldWrapChildren>
                        <Image
                            imageData={rune.image}
                            alt={rune.title}
                            width={42} />
                    </Tooltip>
                ) )}
        </Stack>
    )
}

export default Runes
