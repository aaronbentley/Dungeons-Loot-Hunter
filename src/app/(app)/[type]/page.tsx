import { typesMap } from '@/assets/data/types'
import Image from '@/components/image'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
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

    const typeTitle = typesMap[typeName as keyof typeof typesMap] as string

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>{typeTitle}</PageHeaderHeading>
            </PageHeader>

            <div className='grid md:grid-flow-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-2'>
                {typeItems &&
                    typeItems.map((item) => {
                        // console.log('🦄 ~ file: page.tsx:33 ~ item:', item)

                        return (
                            <Link
                                key={item._id}
                                href={item?.slug?.current}>
                                <Card
                                    className={cn([
                                        'flex',
                                        'flex-col',
                                        // 'justify-between',
                                        // 'justify-evenly',
                                        // 'justify-around',
                                        'justify-start',
                                        'h-full',
                                        'bg-emerald-400',
                                        'group',
                                        'dark:bg-emerald-800',
                                        'border-emerald-500',
                                        'dark:border-emerald-900',
                                        item.isUnique &&
                                            'bg-amber-400 dark:bg-amber-600 border-amber-500 dark:border-amber-500'
                                    ])}>
                                    <CardContent className='pt-4'>
                                        {item?.image && (
                                            <Image
                                                image={item?.image}
                                                alt={item?.title}
                                                src={item?.image}
                                                width={400}
                                                height={300}
                                                mode='contain'
                                                // className='w-full h-48 object-cover'
                                                className='transition-all duration-200 group-hover:scale-105'
                                            />
                                        )}
                                    </CardContent>
                                    <CardHeader>
                                        <CardTitle className='font-medium'>
                                            {item?.title}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>
                        )
                    })}
            </div>
        </>
    )
}

export default TypePage
