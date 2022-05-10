/**
 * Dungeons Loot Hunter Gatsby.js config
 *
 *  For my babies 🦄👩🏻‍🎤 Lexi 👩🏻‍🎤🦄 & 🧚‍♀️👩🏻‍🎤 Maddi 👩🏻‍🎤🧚‍♀️
 */

// Get build enviroment
const activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'
const previewEnabled =
    (process.env.GATSBY_IS_PREVIEW || 'false').toLowerCase() === 'true'

console.log(`🦄  Using environment config: '${activeEnv}' 🦄`)
console.log('🦄  GATSBY_IS_PREVIEW : previewEnabled', previewEnabled)

require('dotenv').config({
    path: `.env.${activeEnv}`
})

module.exports = {
    siteMetadata: {
        title: `Dungeons Loot Hunter`,
        siteUrl: `https://www.yourdomain.tld`
    },
    plugins: [
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: process.env.GATSBY_SANITY_PROJECT_ID,
                dataset: process.env.GATSBY_SANITY_DATASET,
                // a token with read permissions is required if you have a private dataset
                token: process.env.GATSBY_SANITY_TOKEN,
                // Enable preview of drafts,
                // watchMode: true,
                watchMode: activeEnv === 'development' ? true : false,
                // overlayDrafts: true
                overlayDrafts: activeEnv === 'development' || previewEnabled
            }
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: '314594635'
            }
        },
        'gatsby-plugin-image',
        {
            resolve: 'gatsby-plugin-sanity-image',
            options: {
                projectId: process.env.GATSBY_SANITY_PROJECT_ID,
                dataset: process.env.GATSBY_SANITY_DATASET,
                // fragmentName: 'Image',
                // fragmentTypeName: 'MainImage',

                // Provide the custom image type name used in Sanity data schemas
                // customImageTypes: ['SanityMainImage'],
                // Provide the alt text type name used in Sanity data schemas
                // altFieldName: 'alt',
                // Add 'alt' field to each fragment
                // customFields: [
                //     { 
                //         name: 'alt', 
                //         type: 'String' 
                //     }
                // ],
                // defaultImageConfig: {
                //     quality: 95, // use reasonable lossy compression level
                //     fit: 'max', // like `object-fit: contain`, but never scaling up
                //     auto: 'format' // automatically select next-gen image formats on supporting browsers
                // }
            }
        },
        {
            resolve: '@chakra-ui/gatsby-plugin',
            options: {
                /**
                 * @property {boolean} [resetCSS=true]
                 * if false, this plugin will not use `<CSSReset />
                 */
                resetCSS: true,
                /**
                 * @property {boolean} [isUsingColorMode=true]
                 * if false, this plugin will not use <ColorModeProvider />
                 */
                isUsingColorMode: true
            }
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/icon.png'
            }
        }
    ]
}
