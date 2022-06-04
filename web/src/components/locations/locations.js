/**
 * MC Dungeons Loot Hunter Locations
 */
import { Heading, Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Link from '../../components/link/link'
import { generateSlug } from '../../utils/helpers'
import Image from '../image/image'

const Locations = ( { data = {} } ) => {
    // If no data, bail early    
    if ( !data ) {
        return null
    }

    // Check if standard (array) or unqiue (nested array)
    const locations = Array.isArray( data ) ? data : data.obtainableOn

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
                Locations
            </Heading>
            <Stack direction='row' spacing={2}>
                {locations &&
                locations.map( ( location ) => (
                    <Tooltip
                        key={location.id}
                        label={location.title}
                        placement='top'
                        shouldWrapChildren>
                        <Link
                            to={`/${generateSlug( location._type )}/${
                                location.slug.current
                            }/`}>
                            <Image
                                imageData={location.image}
                                alt={location.title}
                                width={84}
                                height={84} />
                        </Link>
                    </Tooltip>
                ) )}
            </Stack>
        </Stack>
    )
}

export default Locations
