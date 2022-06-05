/**
 * MC Dungeons Loot Hunter Ancient Mob index
 */
import { Container, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../../components/layouts'

const AncientMobs = ( { data = {} } ) => {
    return (
        <Layout>
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h1'
                        fontSize={['4xl', '6xl']}
                        noOfLines={2}
                        mb={0}>
                        Ancient Mobs
                    </Heading>
                </Stack>
            </Container>
        </Layout>
    )
}

export default AncientMobs
