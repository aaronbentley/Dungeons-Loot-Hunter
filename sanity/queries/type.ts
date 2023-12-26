import { groq } from 'next-sanity'
import { imageAssetReference } from './fragments'

/**
 * Get type items by typeName
 */
export const typeItemsQuery = groq`
    *[_type == $typeName] | order(!isUnique, title asc) {
        ...,
        ${imageAssetReference}
    }
`
