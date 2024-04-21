import { Armor, MeleeWeapon, RangedWeapon } from '../../types'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ItemEnchantments = ({
    item
}: {
    item: MeleeWeapon | RangedWeapon | Armor
}) => {
    if (!item.isUnique || !item.builtInEnchantments) {
        return null
    }

    return (
        <div>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Enchantments
            </Typography>
            <div className='flex items-center'>
                {item.builtInEnchantments &&
                    item.builtInEnchantments.map((enchantment, index) => (
                        <div key={index}>
                            <Tooltip>
                                <TooltipTrigger className='cursor-help'>
                                    <Image
                                        key={index}
                                        image={enchantment.image}
                                        alt={enchantment.title}
                                        width={64}
                                        mode='contain'
                                        className='aspect-square object-contain'
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    {enchantment.title}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ItemEnchantments
