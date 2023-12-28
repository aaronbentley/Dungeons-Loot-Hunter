import { Armor, Artifact } from '@/types'
import { Typography } from './typography'

const ItemTraits = ({ item }: { item: Armor | Artifact }) => {
    console.log('🦄 ~ file: item-traits.tsx:5 ~ ItemTraits ~ item:', item)
    if (!item.traits) {
        return null
    }

    return (
        <div className='md:col-span-2 lg:col-span-1'>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Traits
            </Typography>
            <Typography
                variant='ul'
                className='ps-2 marker:text-zinc-500'>
                {item.traits.map((trait: string, index: number) => (
                    <Typography
                        variant='li'
                        key={index}>
                        {trait}
                    </Typography>
                ))}

                {'requiresSouls' in item && item?.requiresSouls && (
                    <Typography variant='li'>Requires Souls</Typography>
                )}
            </Typography>
        </div>
    )
}

export default ItemTraits
