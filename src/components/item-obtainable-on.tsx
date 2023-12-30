import { Armor, Artifact, MeleeWeapon, RangedWeapon } from '@/types'
import Link from 'next/link'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ItemObtainableOn = ({
    item
}: {
    item: MeleeWeapon | RangedWeapon | Armor | Artifact
}) => {
    if (
        !['meleeWeapons', 'rangedWeapons', 'armor', 'artifacts'].includes(
            item._type
        )
    ) {
        return null
    }

    return (
        <div>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Locations
            </Typography>
            <div className='grid grid-cols-4 items-center gap-4'>
                {item.obtainableOn.levels &&
                    item.obtainableOn.levels.map((level, index) => (
                        <div key={index}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link
                                        href={`/levels/${level.slug.current}`}>
                                        <Image
                                            key={index}
                                            image={level.image}
                                            alt={level.title}
                                            width={84}
                                            height={84}
                                            mode='cover'
                                            className='rounded-lg aspect-square'
                                        />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>{level.title}</TooltipContent>
                            </Tooltip>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ItemObtainableOn
