import { groq } from 'next-sanity'
import { imageAssetReference, slug } from './fragments'

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
        ${imageAssetReference},
        variationOf->,
        builtInEnchantments[]-> {
            title,
            ${imageAssetReference}
        },
        runes[]-> {
            title,
            ${imageAssetReference}
        },
        "obtainableOn" : select(
            isUnique == true => {
                "levels": variationOf-> obtainableOn[]-> {
                    title,
                    ${imageAssetReference},
                    ${slug}
                }
            },
            isUnique == false => {
                "levels": obtainableOn[]-> {
                    title,
                    ${imageAssetReference},
                    ${slug}
                }
            }
        ),
        "droppedBy" : select(
            isUnique == true => {
                "ancientMobs": variationOf-> droppedBy[]-> {
                    title,
                    ${imageAssetReference},
                    ${slug}
                }
            },
            isUnique == false => {
                "ancientMobs": droppedBy[]-> {
                    title,
                    ${imageAssetReference},
                    ${slug}
                }
            }
        ),
        "variationOf" : select(
            isUnique == true => variationOf-> {
                title,
                ${imageAssetReference},
                ${slug}
            },
            isUnique == false => null
        ),
        "uniqueVariants" : select(
            isUnique == true => null,
            isUnique == false => *[_type == $typeName && references(^._id)] {
                title,
                ${imageAssetReference},
                ${slug}
            }
        ),
    }
`
