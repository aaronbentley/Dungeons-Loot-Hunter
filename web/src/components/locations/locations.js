/**
 * Dungeons Loot Hunter Locations
 */
import { Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const Locations = ({ data = {} }) => {
    if (!data) {
        return null
    }

    // Check if standard (array) or unqiue (nested array)
    const locations = Array.isArray(data) ? data : data.obtainableOn

    return (
        <Stack direction='row' spacing={2}>
            {locations && locations.map((location) => (
                <Tooltip
                    key={location.id}
                    label={location.title}
                    placement='top'
                    colorScheme='purple'
                    shouldWrapChildren>
                    <Image
                        imageData={location.image}
                        alt={location.title}
                        width={84}
                        height={84}
                    />
                </Tooltip>
            ))}
        </Stack>
    )
}

export default Locations
