/**
 * MC Dungeons Loot Hunter Ranged Weapons index
 */
import { Container, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../../components/layouts'

const RangedWeapons = ( { data = {} } ) => {
    return (
        <Layout>
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h1'
                        fontSize={['4xl', '6xl']}
                        noOfLines={2}
                        mb={0}>
                        Ranged Weapons
                    </Heading>
                </Stack>
            </Container>
        </Layout>
    )
}

export default RangedWeapons
