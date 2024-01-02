import { typesMap } from '@/assets/data/types'
import Image from '@/components/image'
import ItemDroppedBy from '@/components/item-dropped-by'
import ItemEnchantments from '@/components/item-enchantments'
import ItemObtainableOn from '@/components/item-obtainable-on'
import ItemRuneValue from '@/components/item-rune-value'
import ItemStats from '@/components/item-stats'
import ItemTraits from '@/components/item-traits'
import ItemVariants from '@/components/item-variants'
import LevelLootDrops from '@/components/level-loot-drops'
import MobEnchantments from '@/components/mob-enchantments'
import MobLootDrops from '@/components/mob-loot-drops'
import MobRuneItems from '@/components/mob-rune-items'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import RuneRequirements from '@/components/rune-requirements'
import { Badge } from '@/components/ui/badge'
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
import { itemQuery, typeItemsQuery } from '@sanity/queries'
import camelize from 'camelize'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

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

export const generateMetadata = async ({
    params
}: {
    params: {
        type: string
        slug: string
    }
}): Promise<Metadata> => {
    const item = await client.fetch<
        MeleeWeapon | RangedWeapon | Armor | Artifact | AncientMob | Level
    >(itemQuery, {
        typeName: camelize(params.type),
        slug: params.slug
    })

    return {
        title: `${item.title} - ${typesMap[item._type]}`
    }
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

    /**
     * If the item is not found, return a 404 page
     */
    if (!item) notFound()

    return (
        <>
            <PageHeader className='gap-6'>
                <Badge variant='secondary'>{typesMap[item._type]}</Badge>
                <PageHeaderHeading>{item.title}</PageHeaderHeading>
                <div className='flex gap-2 pointer-events-none'>
                    {[
                        'meleeWeapons',
                        'rangedWeapons',
                        'armor',
                        'artifacts'
                    ].includes(item._type) && (
                        <>
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

                            {'eventItem' in item &&
                                item.eventItem.isEventItem && (
                                    <Badge
                                        variant='secondary'
                                        className='text-purple-500 dark:text-purple-500 bg-purple-50 dark:bg-purple-950 border-purple-50 dark:border-purple-950'>
                                        {item.eventItem.title}
                                    </Badge>
                                )}
                        </>
                    )}

                    {'levels' === item._type && (
                        <>
                            {item?.location?.[0] && (
                                <Badge className='text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-900 capitalize'>
                                    {item.location[0].replace('-', ' ')}
                                </Badge>
                            )}

                            {item.isDlc && (
                                <Badge
                                    variant='secondary'
                                    className='text-blue-500 dark:text-blue-500 bg-blue-50 dark:bg-blue-950 border-blue-50 dark:border-blue-950'>
                                    {item.dlcTitle} DLC
                                </Badge>
                            )}
                        </>
                    )}
                </div>
            </PageHeader>
            <div className='px-4 grid md:grid-flow-dense grid-cols-1 md:grid-cols-3 gap-x-0 gap-6 md:gap-x-6 xl:gap-x-16 '>
                <div className='col-span-1'>
                    <div className='md:sticky md:top-24'>
                        {item.image && (
                            <Image
                                image={item.image}
                                alt={item.title}
                                src={item.image}
                                priority={true}
                                width={400}
                                height={400}
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
                                    item._type === 'levels' && 'object-cover',
                                    [
                                        'meleeWeapons',
                                        'rangedWeapons',
                                        'armor',
                                        'artifacts'
                                    ].includes(item._type) && [
                                        'p-8',
                                        'bg-emerald-200',
                                        'dark:bg-emerald-900',
                                        'border-emerald-200',
                                        'dark:border-emerald-500'
                                    ],
                                    'isUnique' in item &&
                                        item.isUnique && [
                                            'p-8',
                                            'bg-orange-200',
                                            'dark:bg-orange-900',
                                            'border-orange-200',
                                            'dark:border-orange-900'
                                        ]
                                ])}
                            />
                        )}
                        {'isUnique' in item && <ItemVariants item={item} />}
                    </div>
                </div>

                {[
                    'meleeWeapons',
                    'rangedWeapons',
                    'armor',
                    'artifacts'
                ].includes(item._type) && (
                    <div className='md:col-span-2'>
                        <div className='grid grid-row-subgrid md:grid-cols-2 gap-12'>
                            {'stats' in item && <ItemStats item={item} />}

                            {'traits' in item && <ItemTraits item={item} />}

                            {'droppedBy' in item && (
                                <ItemDroppedBy item={item} />
                            )}

                            {'builtInEnchantments' in item && (
                                <ItemEnchantments item={item} />
                            )}

                            {'runes' in item && <ItemRuneValue item={item} />}

                            {'obtainableOn' in item && (
                                <ItemObtainableOn item={item} />
                            )}
                        </div>
                    </div>
                )}

                {'ancientMobs' === item._type && (
                    <div className='md:col-span-2'>
                        <div className='grid grid-row-subgrid md:grid-cols-2 gap-12'>
                            {'lootDrops' in item && (
                                <MobLootDrops ancientMob={item} />
                            )}
                            {'runeRequirements' in item && (
                                <RuneRequirements ancientMob={item} />
                            )}
                            {'enchantments' in item && (
                                <MobEnchantments ancientMob={item} />
                            )}
                            {'runeRequirements' in item && (
                                <MobRuneItems ancientMob={item} />
                            )}
                        </div>
                    </div>
                )}

                {'levels' === item._type && (
                    <div className='md:col-span-2'>
                        <div className='grid grid-row-subgrid md:grid-cols-2 gap-12'>
                            <LevelLootDrops level={item} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ItemPage
