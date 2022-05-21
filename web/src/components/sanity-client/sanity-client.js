/**
 * MC Dungeons Loot Hunter Sanity client
 */

import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: process.env.GATSBY_SANITY_DATASET,
    token: process.env.GATSBY_SANITY_TOKEN,
    apiVersion: '2021-08-31', // use current UTC date - see "specifying API version"!
    useCdn: true // `false` if you want to ensure fresh data
})
