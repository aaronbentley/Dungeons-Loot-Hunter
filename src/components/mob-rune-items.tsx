import { AncientMob } from '@/types'
// import { mobRunesItemsQuery } from '@sanity/queries'
import { Typography } from './typography'

const MobRuneItems = async ({ ancientMob }: { ancientMob: AncientMob }) => {
    // const mobRuneItems = await client.fetch<
    //     MeleeWeapon | RangedWeapon | Armor | Artifact
    // >(mobRunesItemsQuery, {
    //     runes: ancientMob.runeRequirements
    // })

    return (
        <div className='md:col-span-2'>
            <Typography
                variant='h4'
                as='h2'
                className='mb-4'>
                Items with Runes
            </Typography>
            <div className='grid grid-cols-4 sm:grid-cols-6 items-center gap-2'></div>
        </div>
    )
}

export default MobRuneItems
