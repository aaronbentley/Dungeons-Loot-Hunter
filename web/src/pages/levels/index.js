/**
 * MC Dungeons Loot Hunter Levels index
 */
import { Container, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../../components/layouts'

const Levels = ( { data = {} } ) => {
    return (
        <Layout>
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h1'
                        fontSize={['4xl', '6xl']}
                        noOfLines={2}
                        mb={0}>
                        Levels
                    </Heading>
                </Stack>
            </Container>
        </Layout>
    )
}

export default Levels
