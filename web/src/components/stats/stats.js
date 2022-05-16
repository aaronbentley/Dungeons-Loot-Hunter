/**
 * Dungeons Loot Hunter Stats
 */

import { Heading, Progress, Stack } from '@chakra-ui/react'
import React from 'react'

const Stats = ({ type = '', data = {} }) => {

    const MAX_VALUE = 14

    return (
        <Stack direction='column' spacing={12}>
            <Heading as='h2'>Stats</Heading>
            <Stack direction='column' spacing={6}>
                <Progress max={MAX_VALUE} value={data.power} />
                <Progress max={MAX_VALUE} value={data.speed} />
                {type === 'meleeWeapons' && (
                    <Progress max={MAX_VALUE} value={data.area} />
                )}
                {type === 'rangedWeapons' && (
                    <Progress max={MAX_VALUE} value={data.ammo} />
                )}
                
            </Stack>
        </Stack>
    )
}

export default Stats
