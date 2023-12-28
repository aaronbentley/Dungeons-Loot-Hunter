import { MeleeWeapon, RangedWeapon } from '@/types'
import { Typography } from './typography'
import { Progress } from './ui/progress'

const ItemStats = ({ item }: { item: MeleeWeapon | RangedWeapon }) => (
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
                aria-label='Power stat'
                className='col-span-4'
                value={
                    (item.stats.power /
                        parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
                    100
                }
                max={parseInt(process.env.ITEM_STATS_MAX_VALUE!)}
            />
        </div>
        <div className='grid grid-cols-5 items-center'>
            <Typography
                muted
                as='span'>
                Speed
            </Typography>
            <Progress
                aria-label='Speed stat'
                className='col-span-4'
                value={
                    (item.stats.speed /
                        parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
                    100
                }
                max={parseInt(process.env.ITEM_STATS_MAX_VALUE!)}
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
                        aria-label='Area stat'
                        className='col-span-4'
                        value={
                            (item.stats.area /
                                parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
                            100
                        }
                        max={parseInt(process.env.ITEM_STATS_MAX_VALUE!)}
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
                        aria-label='Ammo stat'
                        className='col-span-4'
                        value={
                            (item.stats.ammo /
                                parseInt(process.env.ITEM_STATS_MAX_VALUE!)) *
                            100
                        }
                        max={parseInt(process.env.ITEM_STATS_MAX_VALUE!)}
                    />
                </>
            )}
        </div>
    </div>
)

export default ItemStats
