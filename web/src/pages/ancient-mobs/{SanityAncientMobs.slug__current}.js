/**
 * Dungeons Loot Hunter Ancient Mob
 */

import {
    Box, Container,
    Heading,
    SimpleGrid,
    Stack
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import BackButton from '../../components/back-button/back-button'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'

export const query = graphql`
    query ($id: String!) {
        sanityAncientMobs(id: { eq: $id }) {
            type: _type
            title
            image {
                ...ImageWithPreview
            }
        }
    }
`

const AncientMob = ({ data = {} }) => {
    const {
        sanityAncientMobs: { type = '', title = '', image = {} }
    } = data

    return (
        <Layout>
            <Container maxWidth='6xl' py={24}>
                <Stack direction='column' spacing={12}>
                    <Stack direction='column' spacing={2}>
                        <BackButton />
                        <Heading as='h1' fontSize='6xl' noOfLines={1} mb={0}>
                            {title}
                        </Heading>
                    </Stack>
                    <SimpleGrid columns={[1, 2]} spacing={10}>
                        <Box>
                            <Image
                                p={6}
                                imageData={image}
                                alt={title}
                                width={350}
                                height={350}
                                borderRadius={2}
                            />
                        </Box>
                    </SimpleGrid>
                </Stack>
            </Container>
        </Layout>
    )
}

export default AncientMob
