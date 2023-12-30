import { pathsMap } from '@/assets/data/types'
import { cn } from '@/lib/utils'
import { Armor, Artifact, MeleeWeapon, RangedWeapon } from '@/types'
import Link from 'next/link'
import Image from './image'
import { Typography } from './typography'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const ItemVariants = ({
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

    if (item.isUnique) {
        return (
            <div className='mt-4'>
                <Typography
                    as='span'
                    muted>
                    Unique Variant of
                </Typography>

                <div className='grid subgrid gap-y-4 md:grid-flow-dense grid-cols-4 mt-2'>
                    {item.variationOf && (
                        <div>
                            <Link
                                href={`/${pathsMap[item._type]}/${
                                    item.variationOf?.slug.current
                                }/`}
                                className='transition-colors duration-200 underline underline-offset-2 hover:text-indigo-500'>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Image
                                            image={item.variationOf?.image}
                                            alt={item.title}
                                            width={96}
                                            mode='cover'
                                            className={cn([
                                                'p-3',
                                                'rounded-lg',
                                                'aspect-square',
                                                'bg-emerald-200',
                                                'dark:bg-emerald-900',
                                                'border-emerald-200',
                                                'dark:border-emerald-500'
                                            ])}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {item.variationOf?.title}
                                    </TooltipContent>
                                </Tooltip>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    if (item.uniqueVariants && item.uniqueVariants.length) {
        return (
            <div className='mt-4'>
                <Typography
                    as='span'
                    muted>
                    Has {item.uniqueVariants.length} Unique{' '}
                    {item.uniqueVariants.length === 1 ? 'Variant' : 'Variants'}
                </Typography>
                <div className='grid subgrid gap-y-4 md:grid-flow-dense gap-4 grid-cols-4 mt-2'>
                    {item.uniqueVariants.map((variant, index) => (
                        <div key={index}>
                            <Link
                                href={`/${pathsMap[item._type]}/${
                                    variant.slug.current
                                }/`}
                                className='transition-colors duration-200 underline underline-offset-2 hover:text-indigo-500'>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Image
                                            image={variant.image}
                                            alt={variant.title}
                                            width={96}
                                            mode='cover'
                                            className={cn([
                                                'p-3',
                                                'rounded-lg',
                                                'aspect-square',
                                                'bg-orange-200',
                                                'dark:bg-orange-900',
                                                'border-orange-200',
                                                'dark:border-orange-900'
                                            ])}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {variant.title}
                                    </TooltipContent>
                                </Tooltip>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ItemVariants
