import { pathsMap } from '@/assets/data/types'
import { client } from '@sanity/lib/client'
import { imageBuilder } from '@sanity/lib/image'
import { imageAssetReference, slug } from '@sanity/queries/fragments'
import algoliasearch from 'algoliasearch'
import { SanityDocumentStub } from 'next-sanity'
import { NextRequest, NextResponse } from 'next/server'
import indexer from 'sanity-algolia'

// export const GET = async (request: NextRequest) => {
//     try {
//         const algolia = algoliasearch(
//             process.env.ALGOLIA_APP_ID!,
//             process.env.ALGOLIA_ADMIN_KEY!
//         )

//         const algoliaIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME!)

//         const sanityAlgolia = indexer(
//             {
//                 meleeWeapons: {
//                     index: algoliaIndex,
//                     projection: `{
//                         _id,
//                         _type,
//                         title,
//                         isUnique,
//                         ${imageAssetReference},
//                         ${slug},
//                     }`
//                 },
//                 rangedWeapons: {
//                     index: algoliaIndex,
//                     projection: `{
//                         _id,
//                         _type,
//                         title,
//                         isUnique,
//                         ${imageAssetReference},
//                         ${slug},
//                     }`
//                 },
//                 armor: {
//                     index: algoliaIndex,
//                     projection: `{
//                         _id,
//                         _type,
//                         title,
//                         isUnique,
//                         ${imageAssetReference},
//                         ${slug},
//                     }`
//                 },
//                 artifacts: {
//                     index: algoliaIndex,
//                     projection: `{
//                         _id,
//                         _type,
//                         title,
//                         isUnique,
//                         ${imageAssetReference},
//                         ${slug},
//                     }`
//                 }
//             },
//             (document: SanityDocumentStub) => {
//                 const typePrefix = pathsMap[
//                     document._type as keyof typeof pathsMap
//                 ] as string

//                 const record = {
//                     objectID: document._id,
//                     title: document.title,
//                     unique: document.isUnique ? true : false,
//                     imageData: document.image,
//                     image: imageBuilder
//                         .image(document.image)
//                         .size(256, 256)
//                         .dpr(2)
//                         .format('webp')
//                         .url(),
//                     url: `/${typePrefix}/${document.slug.current}/`
//                 }

//                 return record
//             }
//         )

//         const types = ['meleeWeapons', 'rangedWeapons', 'armor', 'artifacts']
//         const query = `* [_type in $types && !(_id in path("drafts.**"))][]._id`

//         const items = await client
//             .fetch(query, { types })
//             .then((ids: string[]) => {
//                 sanityAlgolia.webhookSync(client, {
//                     ids: { created: ids, updated: [], deleted: [] }
//                 })
//             })

//         return NextResponse.json({ message: 'success' }, { status: 200 })
//     } catch (error) {
//         let message = 'Something went wrong.'
//         if (error instanceof Error) message = error.message
//         return NextResponse.json(
//             { message: 'error', error: message },
//             { status: 400 }
//         )
//     }
// }

export const POST = async (request: NextRequest) => {
    try {
        const algolia = algoliasearch(
            process.env.ALGOLIA_APP_ID!,
            process.env.ALGOLIA_ADMIN_KEY!
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

        const data = await request.json()

        return sanityAlgolia
            .webhookSync(client, data)
            .then(() => {
                return NextResponse.json(
                    { message: 'success' },
                    { status: 200 }
                )
            })
            .catch((error) => {
                throw new Error(error)
            })
    } catch (error) {
        let message = 'Something went wrong.'
        if (error instanceof Error) message = error.message
        return NextResponse.json(
            { message: 'error', error: message },
            { status: 400 }
        )
    }
}
