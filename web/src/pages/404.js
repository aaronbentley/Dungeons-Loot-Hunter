/**
 * MC Dungeons Loot Hunter 404
 */
import { Button, Center, Container, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Emoji from '../components/emoji/emoji'
import { Layout } from '../components/layouts'
import Link from '../components/link/link'
import Seo from '../components/seo/seo'

const NotFoundPage = () => {
    return (
        <Layout>
            <Seo title='404 Not found' />
            <Container maxWidth='6xl' py={12} centerContent>
                <Stack direction='column' spacing={6}>
                    <Heading>This ain't it Chief</Heading>
                    <Text textAlign='center'>You hit a route that doesn't exist.</Text>
                    <Center>
                        <Button 
                            leftIcon={<Emoji symbol='🏠' label='cookie' />}
                            as={Link} 
                            to='/' 
                            width='max'>
                            Home
                        </Button>
                    </Center>
                </Stack>
            </Container>
        </Layout>
    )
}

export default NotFoundPage
