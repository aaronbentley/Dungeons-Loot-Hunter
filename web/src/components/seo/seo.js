/**
 *  MC Dungeons Loot Hunter Seo
 */
import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import { useSiteSettings } from '../../hooks/use-site-settings'
// import SanityImageUrlBuilder from '../../sanity/sanity-image-url-builder/sanity-image-url-builder'
 
const Seo = ( {
    lang = 'en',
    url = '',
    title = '',
    description = '',
    image = {},
    type = '',
    meta = [],
    omitSuffix = false
} ) => {
    // Get siteUrl
    const { siteUrl = '' } = useSiteMetadata()
 
    // Grab defaults from Sanity SiteSettings
    // const {
    //     logo: defaultSiteImage = {},
    //     seo: {
    //         seoTitle: defaultSiteTitle = '',
    //         seoDescription: defaultSiteDescription = ''
    //     }
    // } = useSiteSettings()

    const {
        title: defaultSiteTitle = '',
        description: defaultSiteDescription = ''
    } = useSiteSettings()
 
    // Create meta data with fallbacks from siteSettings defaults
    const seoTitle = title || defaultSiteTitle
    const seoDescription = description || defaultSiteDescription
 
    // Generate open graph image assets
    // const openGraphImage =
    //      Object.keys( image ).length !== 0
    //          ? SanityImageUrlBuilder( image, 1920, 1080, 'max', 1, 'webp' )
    //          : SanityImageUrlBuilder( defaultSiteImage, 1920, 1080, 'max', 1, 'webp' )
 
    // Create default meta tags array
    const defaultMeta = [
        {
            property: 'og:url',
            content: url ? `${siteUrl}${url}` : siteUrl
        },
        {
            property: 'og:title',
            content: seoTitle
        },
        {
            name: 'description',
            content: seoDescription
        },
        {
            property: 'og:description',
            content: seoDescription
        },
        // {
        //     property: 'og:image',
        //     content: openGraphImage
        // },
        {
            property: 'og:type',
            content: type || 'website'
        }
    ]
 
    // Spread default meta with additional meta tags from props
    const seoMeta = [...defaultMeta, ...meta]
 
    return (
        <Helmet
            htmlAttributes={{
                lang
            }}
            title={seoTitle}
            titleTemplate={omitSuffix ? '%s' : `%s | ${defaultSiteTitle}`}
            meta={seoMeta} />
    )
}
 
export default Seo
 