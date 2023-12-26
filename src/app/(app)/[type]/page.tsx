import camelize from 'camelize'
import Link from 'next/link'
import { client } from '../../../../sanity/lib/client'
import { typeItemsQuery } from '../../../../sanity/queries/type'

const TypePage = async ({
    params
}: {
    params: {
        type: string
    }
}) => {
    const { type } = params
    const typeName = camelize(type)
    const typeItems = await client.fetch<any[]>(typeItemsQuery, { typeName })

    return (
        <ul>
            {typeItems.map((item) => (
                <li key={item._id}>
                    {item?.slug?.current && (
                        <Link href={item?.slug?.current}>{item?.title}</Link>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default TypePage
