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
import Link from 'next/link'

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
                    typeItems.map((item) => {
                        // console.log('🦄 ~ file: page.tsx:33 ~ item:', item)

                        return (
                            <Link
                                key={item._id}
                                href={item?.slug?.current}>
                                <Card
                                    className={cn([
                                        'group',
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
                                            'border-emerald-500',
                                            'dark:border-emerald-500'
                                        ],
                                        'isUnique' in item &&
                                            item.isUnique && [
                                                'bg-orange-200',
                                                'dark:bg-orange-900',
                                                'border-orange-500',
                                                'dark:border-orange-500'
                                            ]
                                    ])}>
                                    <CardContent className='pt-4 flex justify-center'>
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
                                        <CardTitle className='font-medium text-center sm:text-start'>
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
