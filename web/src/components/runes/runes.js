/**
 * MC Dungeons Loot Hunter Runes
 */
import { Heading, Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const Runes = ( { title= 'Runes', data = {} } ) => {
    if ( !data ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>{title}</Heading>
            <Stack direction='row' spacing={2}>
                {data &&
                data.map( ( rune, index ) => (
                    <Tooltip
                        key={`${rune.id}-${index}`}
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
        </Stack>
    )
}

export default Runes
