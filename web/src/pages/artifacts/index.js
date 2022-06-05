/**
 * MC Dungeons Loot Hunter Artifacts index
 */
import { Container, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../../components/layouts'

const Artifacts = ( { data = {} } ) => {
    return (
        <Layout>
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h1'
                        fontSize={['4xl', '6xl']}
                        noOfLines={2}
                        mb={0}>
                        Artifacts
                    </Heading>
                </Stack>
            </Container>
        </Layout>
    )
}

export default Artifacts
