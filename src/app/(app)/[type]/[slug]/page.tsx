// Generate segments for [product] using the `params` passed from

import camelize from 'camelize'
import { client } from '../../../../../sanity/lib/client'
import { itemQuery } from '../../../../../sanity/queries/item'
import { typeItemsQuery } from '../../../../../sanity/queries/type'

// the parent segment's `generateStaticParams` function
export const generateStaticParams = async ({
    params: { type }
}: {
    params: { type: string }
}) => {
    const typeName = camelize(type)
    const typeItems = await client.fetch<any[]>(typeItemsQuery, { typeName })
    return typeItems.map((item) => ({
        slug: item?.slug?.current
    }))
}

const ItemPage = async ({
    params
}: {
    params: {
        type: string
        slug: string
    }
}) => {
    const item = await client.fetch<Post>(itemQuery, {
        typeName: camelize(params.type),
        slug: params.slug
    })
    // console.log('🦄 ~ file: page.[slug] tsx ~ item:', item)

    return <h1>{item?.title}</h1>
}

export default ItemPage
