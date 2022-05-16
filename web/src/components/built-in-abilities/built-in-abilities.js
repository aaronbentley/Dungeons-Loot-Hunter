/**
 * Dungeons Loot Hunter Built-in abilities
 */

import { Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const BuiltInAbilities = ({ data = {} }) => {
    if (!data) {
        return null
    }

    return (
        <Stack direction='column' spacing={12}>
            <Heading as='h2'>Built-in Abilities</Heading>
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
        </Stack>
    )
}

export default BuiltInAbilities
