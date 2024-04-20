import { pathsMap } from '@/assets/data/types'
import { cn } from '@/lib/utils'
import { Armor, Artifact, Level, MeleeWeapon, RangedWeapon } from '@/types'
import Link from 'next/link'
import { client } from '../../sanity/lib/client'
import { levelLootDropsQuery } from '../../sanity/lib/queries'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const LevelLootDrops = async ({ level }: { level: Level }) => {
    if (!level) {
        return null
    }

    const levelLootDrops = await client.fetch<
        (
            | (MeleeWeapon & {
                  uniques: MeleeWeapon[]
              })
            | (RangedWeapon & {
                  uniques: RangedWeapon[]
              })
            | (Armor & {
                  uniques: Armor[]
              })
            | (Artifact & {
                  uniques: Artifact[]
              })
        )[]
    >(levelLootDropsQuery, {
        level: level._id
    })

    const uniqueItems = levelLootDrops
        .filter((item) => item.uniques !== null)
        .map((item) => {
            return item.uniques.map(
                (unique: MeleeWeapon | RangedWeapon | Armor | Artifact) =>
                    unique
            )
        })
        .flat()

    return (
        <div className='md:col-span-2'>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Loot Drops
            </Typography>
            <div className='grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-6 items-center gap-2'>
                {[...uniqueItems, ...levelLootDrops].map((item) => (
                    <Link
                        key={item._id}
                        title={`View ${item.title}`}
                        href={`/${pathsMap[item._type]}/${
                            item?.slug?.current
                        }/`}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Image
                                    image={item.image}
                                    alt={item.title}
                                    width={120}
                                    height={120}
                                    mode='contain'
                                    className={cn([
                                        'p-1',
                                        'aspect-square',
                                        'object-contain',
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
                            </TooltipTrigger>
                            <TooltipContent>{item.title}</TooltipContent>
                        </Tooltip>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LevelLootDrops
