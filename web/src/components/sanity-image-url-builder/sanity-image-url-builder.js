/**
 * MC Dungeons Loot Hunter Sanity Image URL Builder
 */
import imageUrlBuilder from '@sanity/image-url'
import client from '../sanity-client/sanity-client'

const SanityImageUrlBuilder = (
    image = null,
    width = 256,
    height = 256,
    dpr = 2,
    format = 'webp'
) => {
    // Guard to bail early if no image assets supplied
    if (!image) {
        return null
    }

    // Create builder using Sanity Client
    const builder = imageUrlBuilder(client)
    return builder
        .image(image)
        .size(width, height)
        .dpr(dpr)
        .format(format)
        .url()
}

export default SanityImageUrlBuilder
