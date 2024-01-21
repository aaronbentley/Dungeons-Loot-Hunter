import { types, typesMap } from '@/assets/data/types'
import Image from '@/components/image'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { loadQuery } from '@sanity/lib/store'
import { typeItemsQuery } from '@sanity/queries'
import camelize from 'camelize'
import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Loading from '../loading'

export const generateMetadata = async ({
    params
}: {
    params: { type: string }
}): Promise<Metadata> => {
    const { type } = params
    const typeName = camelize(type)
    const typeTitle = typesMap[typeName as keyof typeof typesMap] as string

    return {
        title: typeTitle
    }
}

const TypeItemsGrid = async ({ type }: { type: string }) => {
    // const typeItems = await client.fetch<
    //     (MeleeWeapon | RangedWeapon | Armor | Artifact | AncientMob | Level)[]
    // >(typeItemsQuery, { typeName: type })

    const typeItems = await loadQuery<SanityDocument[]>(typeItemsQuery, {
        typeName: type
    })

    // const typeItems = await loadQuery<{
    //     perspective: string | undefined
    //     sourceMap: Record<string, string> | undefined
    //     data: (
    //         | MeleeWeapon
    //         | RangedWeapon
    //         | Armor
    //         | Artifact
    //         | AncientMob
    //         | Level
    //     )[]
    // }>(typeItemsQuery, {
    //     typeName: type
    // })

    if (!typeItems) {
        return null
    }

    return (
        <div className='grid md:grid-flow-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 xl:gap-8 mt-2 px-4'>
            {typeItems &&
                typeItems.data.map((item, index) => (
                    <Link
                        key={item._id}
                        href={item?.slug?.current}>
                        <Card
                            className={cn([
                                'flex',
                                'flex-col',
                                'justify-start',
                                'h-full',
                                [
                                    'meleeWeapons',
                                    'rangedWeapons',
                                    'armor',
                                    'artifacts'
                                ].includes(item._type) && [
                                    'bg-emerald-200',
                                    'dark:bg-emerald-900',
                                    'border-emerald-200',
                                    'dark:border-emerald-900'
                                ],
                                'isUnique' in item &&
                                    item.isUnique && [
                                        'bg-orange-200',
                                        'dark:bg-orange-900',
                                        'border-orange-200',
                                        'dark:border-orange-900'
                                    ]
                            ])}>
                            <CardContent className='pt-4 flex justify-center'>
                                {item?.image && (
                                    <Image
                                        image={item.image}
                                        alt={item.title}
                                        src={item.image}
                                        priority={index < 15}
                                        width={180}
                                        height={180}
                                        mode={
                                            item._type === 'levels'
                                                ? 'cover'
                                                : 'contain'
                                        }
                                        className={cn([
                                            'w-full',
                                            'aspect-square',
                                            'object-contain',
                                            'rounded-lg',
                                            item._type === 'levels' &&
                                                'object-cover'
                                        ])}
                                    />
                                )}
                            </CardContent>
                            <CardHeader>
                                <CardTitle className='font-medium text-xl md:text-2xl'>
                                    {item?.title}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
        </div>
    )
}

const TypePage = async ({
    params
}: {
    params: {
        type: string
    }
}) => {
    const { type } = params
    const typeName = camelize(type)

    // Check if type path exists
    if (!types.includes(typeName)) {
        return notFound()
    }
    const typeTitle = typesMap[typeName as keyof typeof typesMap] as string

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>{typeTitle}</PageHeaderHeading>
            </PageHeader>

            <Suspense fallback={<Loading />}>
                <TypeItemsGrid type={typeName} />
            </Suspense>
        </>
    )
}

export default TypePage
