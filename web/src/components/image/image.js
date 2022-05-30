/**
 * MC Dungeons Loot Hunter Image
 */
import { chakra, shouldForwardProp } from '@chakra-ui/react'
import SanityImage from 'gatsby-plugin-sanity-image'
import React from 'react'

const Image = ({
    imageData,
    width,
    height,
    objectFit = 'cover',
    loading = 'lazy',
    ...rest
}) => {
    const ChakraSanityImage = chakra(SanityImage, {
        shouldForwardProp: (prop) => {
            /**
             * Don't forward Chakra's props
             * @link https://chakra-ui.com/docs/styled-system/features/chakra-factory#chakra-factory-function
             */
            const isChakraProp = !shouldForwardProp(prop)
            if (isChakraProp) {
                return false
            }

            // else forward props
            return prop
        }
    })

    // Bail early if no image asset supplied
    if (!imageData || !imageData.asset) {
        return null
    }

    return (
        <ChakraSanityImage
            {...imageData}
            width={width || null}
            loading={loading}
            height={height || null}
            style={{
                objectFit: objectFit
            }}
            options={{
                __experimentalAspectRatio: true
            }}
            {...rest}
        />
    )
}

export default Image
