/**
 * MC Dungeons Loot Hunter Gatsby.js config
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
    trailingSlash: 'always',
    flags: {
        FAST_DEV: true,
        PRESERVE_FILE_DOWNLOAD_CACHE: true,
        PARALLEL_SOURCING: true
    },
    siteMetadata: {
        siteUrl: process.env.GATSBY_SITE_URL,
        title: process.env.GATSBY_SITE_TITLE,
        author: '@aaronbentley'
    },
    plugins: [
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: process.env.GATSBY_SANITY_PROJECT_ID,
                dataset: process.env.GATSBY_SANITY_DATASET,
                token: process.env.GATSBY_SANITY_TOKEN,
                watchMode: activeEnv === 'development' ? true : false,
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
                altFieldName: 'altText'
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
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
                appId: process.env.GATSBY_ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_ADMIN_KEY,
                queries: require('./src/search/algolia-queries')
            }
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/assets/images/icon.png'
            }
        }
    ]
}
