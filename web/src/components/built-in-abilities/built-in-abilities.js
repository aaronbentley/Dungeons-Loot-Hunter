/**
 * Dungeons Loot Hunter Built-in abilities
 */

import { Stack } from '@chakra-ui/react'
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
                    <Image
                        key={enchantment.id}
                        imageData={enchantment.image}
                        alt={enchantment.title}
                        width={50}
                    />
                ))}
        </Stack>
    )
}

export default BuiltInAbilities
