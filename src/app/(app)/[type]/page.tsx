import { typesMap } from '@/assets/data/types'
import Image from '@/components/image'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
    AncientMob,
    Armor,
    Artifact,
    Level,
    MeleeWeapon,
    RangedWeapon
} from '@/types'
import { client } from '@sanity/lib/client'
import { typeItemsQuery } from '@sanity/queries'
import camelize from 'camelize'
import { Metadata } from 'next'
import Link from 'next/link'

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

const TypePage = async ({
    params
}: {
    params: {
        type: string
    }
}) => {
    const { type } = params
    const typeName = camelize(type)
    const typeItems = await client.fetch<
        (MeleeWeapon | RangedWeapon | Armor | Artifact | AncientMob | Level)[]
    >(typeItemsQuery, { typeName })

    const typeTitle = typesMap[typeName as keyof typeof typesMap] as string

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>{typeTitle}</PageHeaderHeading>
            </PageHeader>

            <div className='grid md:grid-flow-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 xl:gap-8 mt-2 px-4'>
                {typeItems &&
                    typeItems.map((item, index) => (
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
                                            width={400}
                                            height={400}
                                            mode='cover'
                                            className='aspect-square object-cover rounded-lg'
                                        />
                                    )}
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className='font-medium text-center sm:text-start'>
                                        {item?.title}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
            </div>
        </>
    )
}

export default TypePage
