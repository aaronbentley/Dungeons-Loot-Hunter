/**
 * MC Dungeons Loot Hunter Ancient Mobs index
 */
import {
    Container,
    Grid,
    GridItem,
    Heading,
    LinkBox,
    LinkOverlay,
    Stack
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Link from '../../components/link/link'
import { generateSlug, mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query ANCIENT_MOBS_INDEX {
        allSanityAncientMobs(
            sort: { fields: title } 
        ) {
            edges {
              node {
                _type
                id
                title
                slug {
                    current
                }
                image {
                    ...ImageWithPreview
                }
              }
            }
          }
    }
`

const AncientMobs = ( { data = {} } ) => {
    const { 
        allSanityAncientMobs = []
    } = data

    const ancientMobs = [
        ...mapEdgesToNodes( allSanityAncientMobs )
    ]

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
                    <Grid
                        templateColumns={[
                            'repeat(3, 1fr)',
                            'repeat(2, 1fr)',
                            'repeat(3, 1fr)',
                            'repeat(5, 1fr)'
                        ]}
                        gap={6}>
                        {ancientMobs &&
                            ancientMobs.map( ( { node } ) => {
                                return (
                                    <GridItem key={node.id}>
                                        <LinkBox>
                                            <Stack
                                                direction='column'
                                                spacing={2}>
                                                <Image
                                                    padding={2}
                                                    imageData={node.image}
                                                    alt={node.title}
                                                    width={280}
                                                    config={{
                                                        fit: 'crop'
                                                    }}
                                                    borderRadius={2} />
                                                <LinkOverlay
                                                    as={Link}
                                                    to={`/${generateSlug(
                                                        node._type
                                                    )}/${
                                                        node.slug
                                                            .current
                                                    }/`}
                                                    _hover={{
                                                        textDecoration: 'none'
                                                    }}>
                                                    <Heading
                                                        as='h4'
                                                        fontSize={['xs', 'lg']}
                                                        noOfLines={2}
                                                        pt={2}
                                                        pb={4}>
                                                        {node.title}
                                                    </Heading>
                                                </LinkOverlay>
                                            </Stack>
                                        </LinkBox>
                                    </GridItem>
                                )
                            } )}
                    </Grid>
                </Stack>
            </Container>
        </Layout>
    )
}

export default AncientMobs
