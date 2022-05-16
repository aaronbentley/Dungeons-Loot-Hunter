/**
 * Dungeons Loot Hunter Image
 */
import { chakra } from '@chakra-ui/react'
import SanityImage from 'gatsby-plugin-sanity-image'
import React from 'react'

const Image = ( { imageData, width, height, objectFit = 'cover', loading = 'lazy', ...rest } ) => {
    
    const ChakraSanityImage = chakra( SanityImage, {
        shouldForwardProp: ( prop ) => prop
    } )

    // Bail early if no image asset supplied
    if ( !imageData || !imageData.asset ) {
        return null
    }

    return (
        <ChakraSanityImage
            {...imageData}
            width={( width || null )}
            loading={loading}
            height={( height || null )}
            style={{
                objectFit: objectFit
            }}
            options={{
                __experimentalAspectRatio: true
            }}
            {...rest} />
    )
}

export default Image