/**
 * Dungeons Loot Hunter Built-in abilities
 */

import { Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const BuiltInAbilities = ({ data = {} }) => {
    if (!data) {
        return null
    }

    return (
        <Stack direction='row' spacing={2}>
            {data &&
                data.map((enchantment) => (
                    <Tooltip
                        key={enchantment.id}
                        label={enchantment.title}
                        placement='top'
                        colorScheme='purple'
                        shouldWrapChildren>
                        <Image
                            imageData={enchantment.image}
                            alt={enchantment.title}
                            width={50}
                        />
                    </Tooltip>
                ))}
        </Stack>
    )
}

export default BuiltInAbilities
