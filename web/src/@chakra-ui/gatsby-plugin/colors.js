/* eslint-disable import/no-anonymous-default-export */
/**
 * Dungeons Loot Hunter Chakra UI Theme Colors
 */
export default {
    colors: {
        brand_primary: {
            50: '#dbf8ff',
            100: '#b4e4fb',
            200: '#8ad0f3',
            300: '#5ebdec',
            400: '#34aae5', // default
            500: '#1a90cb',
            600: '#0b709f',
            700: '#005073',
            800: '#003148',
            900: '#00121e'
        },
        brand_secondary: {
            50: '#ffe5ff',
            100: '#f9b9f7',
            200: '#f28ded',
            300: '#ec60e5',
            400: '#e534dd', // default
            500: '#cb1ac3',
            600: '#9f1299',
            700: '#720a6d',
            800: '#460443',
            900: '#1b001a'
        }
    }
}

// import sanityClient from '@sanity/client'

// // Create Sanity Client
// const client = sanityClient({
//     projectId: process.env.GATSBY_SANITY_PROJECT_ID,
//     dataset: process.env.GATSBY_SANITY_DATASET,
//     token: process.env.GATSBY_SANITY_TOKEN,
//     apiVersion: '2021-08-31', // use current UTC date - see "specifying API version"!
//     useCdn: true // `false` if you want to ensure fresh data
// })

// // Create colors object
// let customColors = {}

// // Get siteSettings from Sanity
// client.getDocument('siteSettings').then((document) => {
//     // console.log(document)
//     const {
//         primaryColor: { hex: primaryColorHex = '' },
//         secondaryColor: { hex: secondaryColorHex = '' }
//     } = document

//     // Build object of color values
//     // customColors['colors']['brand_primary'] = primaryColorHex
//     // customColors['colors']['brand_secondary'] = secondaryColorHex

//     // console.log(colors)

//     customColors['colors']['brand_primary'] = primaryColorHex
//     customColors['colors']['brand_secondary'] = secondaryColorHex
// })

// export default customColors
