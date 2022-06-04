/**
 * MC Dungeons Loot Hunter Ancient mobs
 */
import { Heading, Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { generateSlug } from '../../utils/helpers'
import Image from '../image/image'
import Link from '../link/link'

const AncientMobs = ( { data = {} } ) => {
    if ( !data ) {
        return null
    }

    // Check if standard (array) or unqiue (nested array)
    const ancientMobs = Array.isArray( data ) ? data : data.droppedBy

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
                Ancient Mobs
            </Heading>
            <Stack direction='row' spacing={2}>
                {ancientMobs &&
                ancientMobs.map( ( mob ) => (
                    <Tooltip
                        key={mob.id}
                        label={mob.title}
                        placement='top'
                        shouldWrapChildren>
                        <Link
                            to={`/${generateSlug( mob._type )}/${
                                mob.slug.current
                            }/`}>
                            <Image
                                imageData={mob.image}
                                alt={mob.title}
                                width={84}
                                height={84} />
                        </Link>
                    </Tooltip>
                ) )}
            </Stack>
        </Stack>
    )
}

export default AncientMobs
