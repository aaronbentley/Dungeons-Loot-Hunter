/**
 * MC Dungeons Loot Hunter Melee Weapons index
 */
import { Container, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../../components/layouts'
 
const MeleeWeapons = ( { data = {} } ) => {
    return (
        <Layout>
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h1'
                        fontSize={['4xl', '6xl']}
                        noOfLines={2}
                        mb={0}>
                         Melee Weapons
                    </Heading>
                </Stack>
            </Container>
        </Layout>
    )
}
 
export default MeleeWeapons
 