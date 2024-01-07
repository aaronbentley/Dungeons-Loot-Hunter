import { pathsMap } from '@/assets/data/types'
import { cn } from '@/lib/utils'
import { AncientMob, Armor, MeleeWeapon, RangedWeapon } from '@/types'
import Link from 'next/link'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const MobLootDrops = ({ ancientMob }: { ancientMob: AncientMob }) => {
    if (!ancientMob.lootDrops) {
        return null
    }

    type LootDrop = {
        items: (MeleeWeapon | RangedWeapon | Armor)[]
    }

    return (
        <div className='md:col-span-2'>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Gilded Loot Drops
            </Typography>
            <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 items-center gap-2'>
                {ancientMob.lootDrops.map((lootDrop: LootDrop) => {
                    return lootDrop.items.map(
                        (item: MeleeWeapon | RangedWeapon | Armor) => (
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
                                            width={100}
                                            height={100}
                                            mode='contain'
                                            className={cn([
                                                'p-1',
                                                'aspect-square',
                                                'object-contain',
                                                'sm:p-3',
                                                'rounded-lg',
                                                'bg-yellow-400',
                                                'dark:bg-yellow-600',
                                                'border-yellow-400',
                                                'dark:border-yellow-600'
                                            ])}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        [Gilded] {item.title}
                                    </TooltipContent>
                                </Tooltip>
                            </Link>
                        )
                    )
                })}
            </div>
        </div>
    )
}

export default MobLootDrops
