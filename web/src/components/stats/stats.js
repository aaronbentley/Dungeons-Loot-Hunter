/**
 * MC Dungeons Loot Hunter Stats
 */

import { Grid, GridItem, Progress, Text } from '@chakra-ui/react'
import React from 'react'

const Stats = ( { type = '', data = {}, ...rest } ) => {
    const MAX_VALUE = 14

    return (
        <Grid templateRows='repeat(3, 1fr)' templateColumns='repeat(5, 1fr)'>
            <GridItem colSpan={1}>
                <Text>Power</Text>
            </GridItem>
            <GridItem colSpan={4}>
                <Progress
                    colorScheme='pink'
                    max={MAX_VALUE}
                    value={data.power}
                    my={2} />
            </GridItem>
            <GridItem colSpan={1}>
                <Text>Speed</Text>
            </GridItem>
            <GridItem colSpan={4}>
                <Progress
                    colorScheme='pink'
                    max={MAX_VALUE}
                    value={data.speed}
                    my={2} />
            </GridItem>
            {type === 'meleeWeapons' && (
                <React.Fragment>
                    <GridItem colSpan={1}>
                        <Text>Area</Text>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Progress
                            colorScheme='pink'
                            max={MAX_VALUE}
                            value={data.area}
                            my={2} />
                    </GridItem>
                </React.Fragment>
            )}
            {type === 'rangedWeapons' && (
                <React.Fragment>
                    <GridItem colSpan={1}>
                        <Text>Ammo</Text>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Progress
                            colorScheme='pink'
                            max={MAX_VALUE}
                            value={data.ammo}
                            my={2} />
                    </GridItem>
                </React.Fragment>
            )}
        </Grid>
    )
}

export default Stats
