import { groq } from 'next-sanity'
import { imageAssetReference } from './fragments'

/**
 * Get type items by typeName
 */
export const typeItemsQuery = groq`
    *[_type == $typeName] | order(isUnique desc, title asc) {
        ...,
        ${imageAssetReference}
    }
`

/**
 * Get item by type & slug
 */
export const itemQuery = groq`
    *[
        _type == $typeName && 
        slug.current == $slug 
    ][0] {
        ...,
        ${imageAssetReference}
    }
`
