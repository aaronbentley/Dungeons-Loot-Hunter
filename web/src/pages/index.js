/**
 * MC Dungeons Loot Hunter Index
 */
import { Container, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/layouts'
import Search from '../components/search/search'
import { useSiteMetadata } from '../hooks/use-site-metadata'

// export const query = graphql`
//     query INDEX_PAGE {
//     }
// `

const Index = () => {
    const { title = '' } = useSiteMetadata()

    return (
        <Layout>
            <Container maxWidth='6xl' py={12} centerContent>
                <Stack direction='column' spacing={12}>
                    <Heading as='h1' fontSize='6xl' textAlign='center'>
                        {title}
                    </Heading>
                    <Search />
                </Stack>
            </Container>
        </Layout>
    )
}

export default Index
