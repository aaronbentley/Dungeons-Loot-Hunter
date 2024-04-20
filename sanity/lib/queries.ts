import { groq } from 'next-sanity'

/**
 * Common media fragments
 */
export const imageAssetReference = `
    image {
        ...,
        asset-> {
            ...,
            metadata
        }
    }
`

export const slug = `
    slug {
        current
    }
`

/**
 * Get type items by typeName
 */
export const typeItemsQuery = groq`
    *[
        _type == $typeName &&
        defined(slug.current)
    ] | order(isUnique desc, title asc) {
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
        defined(slug.current) &&
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

/**
 * Get items that feature specific runes
 */
export const mobRunesItemsQuery = groq`
    *[
        (
            _type == 'meleeWeapons' ||
            _type == 'rangedWeapons' ||
            _type == 'armor' || 
            _type == 'artifacts'
        ) && 
        defined(slug.current) &&
        references($runes)
    ] {
        _id,
        _type,
        title,
        isUnique,
        runes[]-> {
            ...,
            ${imageAssetReference}
        },
        ${imageAssetReference},
        ${slug}
    } | order(isUnique desc, title asc)
`

export const levelLootDropsQuery = groq`
    *[
        (
            _type == 'meleeWeapons' ||
            _type == 'rangedWeapons' ||
            _type == 'armor' || 
            _type == 'artifacts'
        ) && 
        defined(slug.current) &&
        references($level)
     ] {
        _id,
        _type,
        title,
        isUnique,
        ${imageAssetReference},
        ${slug},
        "uniques": *[references(^._id)] {
            _id,
            _type,
            title,
            isUnique,
            ${imageAssetReference},
            ${slug}
        }
} 
| order(isUnique desc, title asc)
`

/**
 * Sitemap paths query
 */
export const sitemapPathsQuery = groq`
    *[
        (
            _type == 'meleeWeapons' ||
            _type == 'rangedWeapons' ||
            _type == 'armor' ||
            _type == 'artifacts' ||
            _type == 'ancientMobs' ||
            _type == 'levels'
        ) && 
        defined(slug.current)
    ] {
        _type,
        slug {
            current
        },
        _updatedAt
    }
`
