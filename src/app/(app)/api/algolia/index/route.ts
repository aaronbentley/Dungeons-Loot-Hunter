import { pathsMap } from '@/assets/data/types'
import { client } from '@sanity/lib/client'
import { imageBuilder } from '@sanity/lib/image'
import { imageAssetReference, slug } from '@sanity/queries/fragments'
import algoliasearch from 'algoliasearch'
import { SanityDocumentStub } from 'next-sanity'
import { NextRequest, NextResponse } from 'next/server'
import indexer from 'sanity-algolia'
import { WebhookBody } from 'sanity-algolia/dist/types'

export const POST = async (request: NextRequest) => {
    try {
        const data = (await request.json()) as WebhookBody

        const algolia = algoliasearch(
            process.env.ALGOLIA_APP_ID!,
            process.env.ALGOLIA_ADMIN_API_KEY!
        )

        const algoliaIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME!)

        const sanityAlgolia = indexer(
            {
                meleeWeapons: {
                    index: algoliaIndex,
                    projection: `{
                        _id,
                        _type,
                        title,
                        isUnique,
                        ${imageAssetReference},
                        ${slug},
                    }`
                },
                rangedWeapons: {
                    index: algoliaIndex,
                    projection: `{
                        _id,
                        _type,
                        title,
                        isUnique,
                        ${imageAssetReference},
                        ${slug},
                    }`
                },
                armor: {
                    index: algoliaIndex,
                    projection: `{
                        _id,
                        _type,
                        title,
                        isUnique,
                        ${imageAssetReference},
                        ${slug},
                    }`
                },
                artifacts: {
                    index: algoliaIndex,
                    projection: `{
                        _id,
                        _type,
                        title,
                        isUnique,
                        ${imageAssetReference},
                        ${slug},
                    }`
                }
            },
            (document: SanityDocumentStub) => {
                const typePrefix = pathsMap[
                    document._type as keyof typeof pathsMap
                ] as string

                return {
                    objectID: document._id,
                    title: document.title,
                    unique: document.isUnique ? true : false,
                    imageData: document.image,
                    image: imageBuilder
                        .image(document.image)
                        .size(256, 256)
                        .dpr(2)
                        .format('webp')
                        .url(),
                    url: `/${typePrefix}/${document.slug.current}/`
                }
            }
        )

        await sanityAlgolia.webhookSync(client, data)

        /**
         * Return response
         */
        return NextResponse.json(
            {
                message: 'success'
            },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            {
                message: 'error',
                data: 'no data'
            },
            { status: 400 }
        )
    }
}
