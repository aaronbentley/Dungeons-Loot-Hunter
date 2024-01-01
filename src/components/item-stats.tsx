import { MeleeWeapon, RangedWeapon } from '@/types'
import { Typography } from './typography'
import { Progress } from './ui/progress'

const ItemStats = ({ item }: { item: MeleeWeapon | RangedWeapon }) => {
    // Calculate stat values
    const power =
        (item.stats.power / parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
            100 || 0
    const speed =
        (item.stats.speed / parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
            100 || 0
    const area =
        item._type === 'meleeWeapons'
            ? (item.stats.area / parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
              100
            : 0
    const ammo =
        item._type === 'rangedWeapons'
            ? (item.stats.ammo / parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
              100
            : 0

    return (
        <div className='md:col-span-2 lg:col-span-1'>
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
                    value={power}
                    aria-label='Power stat'
                    className='col-span-4 [&>*]:data-[state=indeterminate]:transition-none [&>*]:data-[state=indeterminate]:duration-0'
                />
            </div>
            <div className='grid grid-cols-5 items-center'>
                <Typography
                    muted
                    as='span'>
                    Speed
                </Typography>
                <Progress
                    value={speed}
                    aria-label='Speed stat'
                    className='col-span-4 [&>*]:data-[state=indeterminate]:transition-none [&>*]:data-[state=indeterminate]:duration-0'
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
                            value={area}
                            aria-label='Area stat'
                            className='col-span-4 [&>*]:data-[state=indeterminate]:transition-none [&>*]:data-[state=indeterminate]:duration-0'
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
                            value={ammo}
                            aria-label='Ammo stat'
                            className='col-span-4 [&>*]:data-[state=indeterminate]:transition-none [&>*]:data-[state=indeterminate]:duration-0'
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default ItemStats
