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
            isUnique != true => {
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
            isUnique != true => {
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
            isUnique != true => *[_type == $typeName && references(^._id)] {
                title,
                ${imageAssetReference},
                ${slug}
            }
        ),
        "runeRequirements" : select(
            _type != "ancientMobs" => null,
            _type == "ancientMobs" => runeRequirements[]-> {
                ...,
                title,
                ${imageAssetReference}
            }
        ),
        "lootDrops" : select(
            _type != "ancientMobs" => null,
            _type == "ancientMobs" => *[references(^._id)] {
                "items": *[references(^._id)] {
                    _type,
                    title,
                    ${imageAssetReference},
                    ${slug}
                }
            }
        ),
        "enchantments" : select(
            _type != "ancientMobs" => null,
            _type == "ancientMobs" => enchantments[]-> {
                title,
                ${imageAssetReference}
            }
        ),
        "mobRuneItems" : select(
            _type != "ancientMobs" => null,
            _type == "ancientMobs" => *[references(^._id)] {
                "items": *[references(^._id)] {
                    _type,
                    title,
                    ${imageAssetReference},
                    ${slug}
                }
            }
        ),
    }
`

// export const mobRunesItemsQuery = groq`
//     *[] {
//         ...
//     }
// `
