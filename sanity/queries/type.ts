import { groq } from 'next-sanity'

/**
 * Get type items by typeName
 */
export const typeItemsQuery = groq`
    *[_type == $typeName] | order(title asc)
`
