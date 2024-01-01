import { pathsMap } from '@/assets/data/types'
import { client } from '@sanity/lib/client'
import { imageBuilder } from '@sanity/lib/image'
import { imageAssetReference, slug } from '@sanity/queries/fragments'
import algoliasearch from 'algoliasearch'
import { SanityDocumentStub } from 'next-sanity'
import { NextRequest, NextResponse } from 'next/server'
import indexer from 'sanity-algolia'

export const POST = async (request: NextRequest) => {
    try {
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
                console.log(
                    '🦄 ~ file: route.ts:68 ~ POST ~ document:',
                    document
                )

                const typePrefix = pathsMap[
                    document._type as keyof typeof pathsMap
                ] as string

                const record = {
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
                console.log('🦄 ~ file: route.ts:89 ~ POST ~ record:', record)

                return record
            }
        )

        const data = await request.json()
        console.log('🦄 ~ file: route.ts:88 ~ POST ~ data:', data)

        // const webhook = await sanityAlgolia.webhookSync(client, data)
        // console.log('🦄 ~ file: route.ts:90 ~ POST ~ webhook:', webhook)
        sanityAlgolia
            .webhookSync(client, data)
            .then((webhook) => {
                console.log('🦄 ~ file: route.ts:90 ~ POST ~ webhook:', webhook)
            })
            .catch((error) => {
                console.log('🦄 ~ file: route.ts:90 ~ POST ~ error:', error)
            })

        /**
         * Return response
         */
        return NextResponse.json({ message: 'success' }, { status: 200 })
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
