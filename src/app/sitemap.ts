import { client } from '@sanity/lib/client'
import { sitemapPathsQuery } from '@sanity/queries'
import { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const paths = [
        '/',
        '/melee-weapons/',
        '/ranged-weapons/',
        '/armor/',
        '/artifacts/',
        '/ancient-mobs/',
        '/levels/'
    ]

    const pathsMap = paths.map((path) => ({
        url: new URL(path, process.env.APP_URL!).href,
        lastModified: new Date().toISOString()
    }))

    const contentPathsQuery = await client.fetch<
        {
            _type: string
            slug: {
                current: string
            }
            _updatedAt: string
        }[]
    >(sitemapPathsQuery)

    const contentPathsMap = contentPathsQuery.map((path) => ({
        url: new URL(
            `/${path._type}/${path.slug.current}/`,
            process.env.APP_URL!
        ).href,
        lastModified: path._updatedAt
    }))

    return [...pathsMap, ...contentPathsMap]
}

export default sitemap
