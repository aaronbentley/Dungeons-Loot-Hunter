import Link from 'next/link'
import { Armor, MeleeWeapon, RangedWeapon } from '../../types'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ItemDroppedBy = ({
    item
}: {
    item: MeleeWeapon | RangedWeapon | Armor
}) => {
    if (!['meleeWeapons', 'rangedWeapons', 'armor'].includes(item._type)) {
        return null
    }

    return (
        <div>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Ancient Mobs
            </Typography>
            <div className='grid grid-cols-4 items-center gap-4'>
                {item.droppedBy.ancientMobs &&
                    item.droppedBy.ancientMobs.map((ancientMob, index) => (
                        <div key={index}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        href={`/ancient-mobs/${ancientMob.slug.current}`}>
                                        <Image
                                            key={index}
                                            image={ancientMob.image}
                                            alt={ancientMob.title}
                                            width={84}
                                            height={84}
                                            mode='contain'
                                            className='rounded-lg aspect-square object-contain'
                                        />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {ancientMob.title}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ItemDroppedBy
