import { pathsMap } from '@/assets/data/types'
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
    ].map((path) => ({
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

    const contentPathsMap = contentPathsQuery.map((contentPath) => {
        const typePrefix = pathsMap[
            contentPath._type as keyof typeof pathsMap
        ] as string
        return {
            url: new URL(
                `/${typePrefix}/${contentPath.slug.current}/`,
                process.env.APP_URL!
            ).href,
            lastModified: contentPath._updatedAt
        }
    })

    return [...paths, ...contentPathsMap]
}

export default sitemap
