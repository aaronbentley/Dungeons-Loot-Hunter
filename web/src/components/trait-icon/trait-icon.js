/**
 * MC Dungeons Loot Hunter Trait icon
 *
 */
import { createIcon } from '@chakra-ui/react'
import React from 'react'

const TraitIcon = createIcon( {
    displayName: 'TraitIcon',
    viewBox: '0 0 512 512',
    path: [
        <path
            d='M256,1L1,256l255,255,255-255L256,1Zm0,337.75l-82.75-82.75,82.75-82.75,82.75,82.75-82.75,82.75Z'
            fill='currentColor' />,
        <polygon
            fill='white'
            opacity='0.4'
            points='338.75 255.5 256 255.5 511 255.5 256 .5 1 255.5 173.25 255.5 256 172.75 338.75 255.5' />
    ]
} )

export default TraitIcon
