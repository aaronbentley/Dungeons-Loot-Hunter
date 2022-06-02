/**
 * MC Dungeons Loot Hunter Index
 */
import { Container, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/layouts'
import Search from '../components/search/search'

// export const query = graphql`
//     query INDEX_PAGE {
//     }
// `

const Index = () => (
    <Layout>
        <Container maxWidth='6xl' py={12} centerContent>
            <Stack direction='column' spacing={12}>
                <Search />
            </Stack>
        </Container>
    </Layout>
)

export default Index
