// Generate segments for [product] using the `params` passed from

import { typesMap } from '@/assets/data/types'
import Image from '@/components/image'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import {
    AncientMob,
    Armor,
    Artifact,
    Level,
    MeleeWeapon,
    RangedWeapon
} from '@/types'
import { client } from '@sanity/lib/client'
import { itemQuery, typeItemsQuery } from '@sanity/queries'
import camelize from 'camelize'

// the parent segment's `generateStaticParams` function
export const generateStaticParams = async ({
    params: { type }
}: {
    params: { type: string }
}) => {
    const typeName = camelize(type)
    const typeItems = await client.fetch<
        (MeleeWeapon | RangedWeapon | Armor | Artifact | AncientMob | Level)[]
    >(typeItemsQuery, { typeName })
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
    const item = await client.fetch<
        MeleeWeapon | RangedWeapon | Armor | Artifact | AncientMob | Level
    >(itemQuery, {
        typeName: camelize(params.type),
        slug: params.slug
    })

    // console.log('🦄 ~ file: page.tsx:43 ~ item:', item)

    return (
        <>
            <PageHeader className='gap-6'>
                {[
                    'meleeWeapons',
                    'rangedWeapons',
                    'armor',
                    'artifacts'
                ].includes(item._type) && (
                    <Badge variant='secondary'>{typesMap[item._type]}</Badge>
                )}
                <PageHeaderHeading>{item.title}</PageHeaderHeading>
                <div className='flex gap-2 pointer-events-none'>
                    {'isUnique' in item && item.isUnique ? (
                        <Badge
                            variant='secondary'
                            className='text-orange-500 dark:text-orange-500 bg-orange-50 dark:bg-orange-950 border-orange-50 dark:border-orange-950'>
                            Unique
                        </Badge>
                    ) : (
                        <>
                            <Badge className='text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-900'>
                                Common
                            </Badge>
                            <Badge className='text-emerald-500 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950 border-emerald-50 dark:border-emerald-950'>
                                Rare
                            </Badge>
                        </>
                    )}

                    {'dlcItem' in item && item.dlcItem.isDlcItem && (
                        <Badge
                            variant='secondary'
                            className='text-blue-500 dark:text-blue-500 bg-blue-50 dark:bg-blue-950 border-blue-50 dark:border-blue-950'>
                            {item.dlcItem.title} DLC
                        </Badge>
                    )}
                </div>
            </PageHeader>
            <div>
                {item?.image && (
                    <Image
                        image={item?.image}
                        alt={item?.title}
                        src={item?.image}
                        width={400}
                        // height={300}
                        mode='contain'
                        // className='w-full h-48 object-cover'
                        className='transition-all duration-200 group-hover:scale-105'
                    />
                )}
            </div>
        </>
    )
}

export default ItemPage
