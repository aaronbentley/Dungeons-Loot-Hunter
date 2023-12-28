import { AncientMob } from '@/types'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const MobEnchantments = ({ ancientMob }: { ancientMob: AncientMob }) => {
    if (!ancientMob.enchantments) {
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
                {ancientMob.enchantments &&
                    ancientMob.enchantments.map((enchantment, index) => (
                        <div key={index}>
                            <Tooltip>
                                <TooltipTrigger className='cursor-help'>
                                    <Image
                                        key={index}
                                        image={enchantment.image}
                                        alt={enchantment.title}
                                        width={64}
                                        mode='cover'
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

export default MobEnchantments
