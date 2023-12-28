import { Armor, Artifact, MeleeWeapon, RangedWeapon } from '@/types'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ItemRuneValue = ({
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
                                    mode='cover'
                                    className='rounded-lg p-1'
                                />
                            </TooltipTrigger>
                            <TooltipContent>{rune.title}</TooltipContent>
                        </Tooltip>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ItemRuneValue
