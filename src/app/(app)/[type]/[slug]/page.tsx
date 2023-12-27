// Generate segments for [product] using the `params` passed from

import { typesMap } from '@/assets/data/types'
import Image from '@/components/image'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Typography } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip'
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
import Link from 'next/link'

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
                <PageHeaderHeading>{item.title}</PageHeaderHeading>
                <div className='flex gap-2 pointer-events-none'>
                    <Badge variant='secondary'>{typesMap[item._type]}</Badge>

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

                    {'eventItem' in item && item.eventItem.isEventItem && (
                        <Badge
                            variant='secondary'
                            className='text-purple-500 dark:text-purple-500 bg-purple-50 dark:bg-purple-950 border-purple-50 dark:border-purple-950'>
                            {item.eventItem.title}
                        </Badge>
                    )}
                </div>
            </PageHeader>
            <div className='px-4 grid md:grid-flow-dense grid-cols-1 md:grid-cols-3 gap-x-0 gap-4 md:gap-x-6 xl:gap-x-16'>
                {item.image && (
                    <Image
                        image={item.image}
                        alt={item.title}
                        src={item.image}
                        width={400}
                        mode='cover'
                        className={cn([
                            'col-span-1',
                            'w-full',
                            'object-cover',
                            'p-8',
                            'rounded-lg',
                            [
                                'meleeWeapons',
                                'rangedWeapons',
                                'armor',
                                'artifacts'
                            ].includes(item._type) && [
                                'bg-emerald-200',
                                'dark:bg-emerald-900',
                                'border-emerald-200',
                                'dark:border-emerald-500'
                            ],
                            'isUnique' in item &&
                                item.isUnique && [
                                    'bg-orange-200',
                                    'dark:bg-orange-900',
                                    'border-orange-200',
                                    'dark:border-orange-900'
                                ]
                        ])}
                    />
                )}

                <div className='col-span-2'>
                    <div className='grid grid-row-subgrid grid-cols-2 gap-12'>
                        {'stats' in item && (
                            <div>
                                <Typography
                                    variant='h4'
                                    as='h2'
                                    className='mb-4'>
                                    Stats
                                </Typography>

                                <div className='grid grid-cols-5 items-center'>
                                    <Typography
                                        muted
                                        as='span'>
                                        Power
                                    </Typography>
                                    <Progress
                                        className='col-span-4'
                                        value={
                                            (item.stats.power /
                                                parseInt(
                                                    process.env
                                                        .ITEM_STATS_MAX_VALUE!
                                                )) *
                                            100
                                        }
                                        max={parseInt(
                                            process.env.ITEM_STATS_MAX_VALUE!
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-5 items-center'>
                                    <Typography
                                        muted
                                        as='span'>
                                        Speed
                                    </Typography>
                                    <Progress
                                        className='col-span-4'
                                        value={
                                            (item.stats.speed /
                                                parseInt(
                                                    process.env
                                                        .ITEM_STATS_MAX_VALUE!
                                                )) *
                                            100
                                        }
                                        max={parseInt(
                                            process.env.ITEM_STATS_MAX_VALUE!
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-5 items-center'>
                                    {item._type === 'meleeWeapons' && (
                                        <>
                                            <Typography
                                                muted
                                                as='span'>
                                                Area
                                            </Typography>
                                            <Progress
                                                className='col-span-4'
                                                value={
                                                    (item.stats.area /
                                                        parseInt(
                                                            process.env
                                                                .ITEM_STATS_MAX_VALUE!
                                                        )) *
                                                    100
                                                }
                                                max={parseInt(
                                                    process.env
                                                        .ITEM_STATS_MAX_VALUE!
                                                )}
                                            />
                                        </>
                                    )}
                                    {item._type === 'rangedWeapons' && (
                                        <>
                                            <Typography
                                                muted
                                                as='span'>
                                                Ammo
                                            </Typography>
                                            <Progress
                                                className='col-span-4'
                                                value={
                                                    (item.stats.ammo /
                                                        parseInt(
                                                            process.env
                                                                .ITEM_STATS_MAX_VALUE!
                                                        )) *
                                                    100
                                                }
                                                max={parseInt(
                                                    process.env
                                                        .ITEM_STATS_MAX_VALUE!
                                                )}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {'droppedBy' in item &&
                            ['meleeWeapons', 'rangedWeapons', 'armor'].includes(
                                item._type
                            ) && (
                                <div>
                                    <Typography
                                        variant='h4'
                                        as='h2'
                                        className='mb-4'>
                                        Ancient Mobs
                                    </Typography>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        {item.droppedBy.ancientMobs &&
                                            item.droppedBy.ancientMobs.map(
                                                (ancientMob, index) => (
                                                    <div key={index}>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Link
                                                                    href={`/ancient-mobs/${ancientMob.slug.current}`}>
                                                                    <Image
                                                                        key={
                                                                            index
                                                                        }
                                                                        image={
                                                                            ancientMob.image
                                                                        }
                                                                        alt={
                                                                            ancientMob.title
                                                                        }
                                                                        width={
                                                                            84
                                                                        }
                                                                        height={
                                                                            84
                                                                        }
                                                                        mode='cover'
                                                                    />
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                {
                                                                    ancientMob.title
                                                                }
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                            )}

                        {'builtInEnchantments' in item && item.isUnique && (
                            <div>
                                <Typography
                                    variant='h4'
                                    as='h2'
                                    className='mb-4'>
                                    Enchantments
                                </Typography>
                                <div className='flex items-center'>
                                    {item.builtInEnchantments &&
                                        item.builtInEnchantments.map(
                                            (enchantment, index) => (
                                                <div key={index}>
                                                    <Tooltip>
                                                        <TooltipTrigger className='cursor-help'>
                                                            <Image
                                                                key={index}
                                                                image={
                                                                    enchantment.image
                                                                }
                                                                alt={
                                                                    enchantment.title
                                                                }
                                                                width={64}
                                                                mode='cover'
                                                            />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {enchantment.title}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        )}

                        {'obtainableOn' in item &&
                            [
                                'meleeWeapons',
                                'rangedWeapons',
                                'armor',
                                'artifacts'
                            ].includes(item._type) && (
                                <div>
                                    <Typography
                                        variant='h4'
                                        as='h2'
                                        className='mb-4'>
                                        Locations
                                    </Typography>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        {item.obtainableOn.levels.map(
                                            (level, index) => (
                                                <div key={index}>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Link
                                                                href={`/levels/${level.slug.current}`}>
                                                                <Image
                                                                    key={index}
                                                                    image={
                                                                        level.image
                                                                    }
                                                                    alt={
                                                                        level.title
                                                                    }
                                                                    width={84}
                                                                    height={84}
                                                                    mode='cover'
                                                                />
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {level.title}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                        {'runes' in item &&
                            [
                                'meleeWeapons',
                                'rangedWeapons',
                                'armor',
                                'artifacts'
                            ].includes(item._type) && (
                                <div>
                                    <Typography
                                        variant='h4'
                                        as='h2'
                                        className='mb-4'>
                                        Rune Value
                                    </Typography>
                                    <div className='flex items-center gap-4'>
                                        {item.runes.map((rune, index) => (
                                            <div key={index}>
                                                <Tooltip>
                                                    <TooltipTrigger className='cursor-help'>
                                                        <Image
                                                            key={index}
                                                            image={rune.image}
                                                            alt={rune.title}
                                                            width={48}
                                                            className='p-1'
                                                            mode='cover'
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {rune.title}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemPage
