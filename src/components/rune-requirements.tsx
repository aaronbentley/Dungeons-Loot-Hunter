import { AncientMob } from '@/types'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const RuneRequirements = ({ ancientMob }: { ancientMob: AncientMob }) => {
    if (!ancientMob.runeRequirements) {
        return null
    }

    return (
        <div>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Rune Requirements
            </Typography>
            <div className='flex items-center gap-4'>
                {ancientMob.runeRequirements.map((rune, index) => (
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

export default RuneRequirements
