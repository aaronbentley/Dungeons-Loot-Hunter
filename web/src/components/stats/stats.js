/**
 * MC Dungeons Loot Hunter Stats
 */

import { Grid, GridItem, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const Stats = ( { type = '', data = {}, ...rest } ) => {
    
    const MAX_VALUE = 14

    if ( !data ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Heading as='h3' fontSize='xl'>
        Stats
            </Heading>
            <Grid templateRows='repeat(3, 1fr)' templateColumns='repeat(5, 1fr)'>
                <GridItem colSpan={1}>
                    <Text>Power</Text>
                </GridItem>
                <GridItem colSpan={4}>
                    <Progress
                        aria-label='Power'
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
                        aria-label='Speed'
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
                                aria-label='Area'
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
                                aria-label='Ammop'
                                colorScheme='pink'
                                max={MAX_VALUE}
                                value={data.ammo}
                                my={2} />
                        </GridItem>
                    </React.Fragment>
                )}
            </Grid>
        </Stack>
    )
}

export default Stats
