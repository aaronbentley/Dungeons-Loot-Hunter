import { pathsMap } from '@/assets/data/types'
import { cn } from '@/lib/utils'
import { AncientMob, Armor, Artifact, MeleeWeapon, RangedWeapon } from '@/types'
import { client } from '@sanity/lib/client'
import { mobRunesItemsQuery } from '@sanity/queries'
import Link from 'next/link'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const MobRuneItems = async ({ ancientMob }: { ancientMob: AncientMob }) => {
    const requiredRuneIds = ancientMob.runeRequirements.map((rune) => rune._id)

    const mobRuneItems = await client.fetch<
        (MeleeWeapon | RangedWeapon | Armor | Artifact)[]
    >(mobRunesItemsQuery, {
        runes: requiredRuneIds
    })

    return (
        <div className='md:col-span-2'>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Items with Runes
            </Typography>
            <div className='grid grid-cols-4 sm:grid-cols-6 items-center gap-2'>
                {mobRuneItems.map((item) => (
                    <Link
                        key={item._id}
                        title={`View ${item.title}`}
                        href={`/${pathsMap[item._type]}/${
                            item?.slug?.current
                        }/`}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='relative'>
                                    <Image
                                        image={item.image}
                                        alt={item.title}
                                        width={120}
                                        height={120}
                                        mode='cover'
                                        className={cn([
                                            'p-1',
                                            'sm:p-3',
                                            'rounded-lg',
                                            'bg-emerald-200',
                                            'dark:bg-emerald-900',
                                            'border-emerald-200',
                                            'dark:border-emerald-500',
                                            'isUnique' in item &&
                                                item.isUnique && [
                                                    'bg-orange-200',
                                                    'dark:bg-orange-900',
                                                    'border-orange-200',
                                                    'dark:border-orange-900'
                                                ]
                                        ])}
                                    />
                                    <div className='absolute bottom-2 left-2 flex gap-2'>
                                        {item.runes.map((rune) => {
                                            if (
                                                requiredRuneIds.includes(
                                                    rune._id
                                                )
                                            )
                                                return (
                                                    <Image
                                                        key={rune._id}
                                                        image={rune.image}
                                                        alt={rune.title}
                                                        width={24}
                                                        height={24}
                                                        mode='cover'
                                                        className={cn([
                                                            'rounded-md'
                                                        ])}
                                                    />
                                                )

                                            return null
                                        })}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>{item.title}</TooltipContent>
                        </Tooltip>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MobRuneItems
