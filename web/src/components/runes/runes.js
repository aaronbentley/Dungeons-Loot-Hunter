/**
 * Dungeons Loot Hunter Runes
 */
import { Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'

const Runes = ({ data = {} }) => {
    return (
        <Stack direction='column' spacing={12}>
            <Heading as='h2'>Runes</Heading>
            <Stack direction='row' spacing={2}>
                {data &&
                    data.map((rune) => (
                        <Image
                            key={rune.id}
                            imageData={rune.image}
                            alt={rune.title}
                            width={50}
                        />
                    ))}
            </Stack>
        </Stack>
    )
}


export default Runes