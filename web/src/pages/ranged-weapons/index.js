/**
 * MC Dungeons Loot Hunter Ranged Weapons index
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
import Seo from '../../components/seo/seo'
import { generateSlug, mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query RANGED_WEAPON_INDEX {
        allUniqueRangedWeapons: allSanityRangedWeapons(
            sort: { fields: title, order: ASC }
            filter: { isUnique: { eq: true } }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    slug {
                        current
                    }
                    isUnique
                    image {
                        ...ImageWithPreview
                    }
                }
            }
        }
        allRangedWeapons: allSanityRangedWeapons(
            sort: { fields: title, order: ASC }
            filter: { isUnique: { ne: true } }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    slug {
                        current
                    }
                    isUnique
                    image {
                        ...ImageWithPreview
                    }
                }
            }
        }
    }
`

const RangedWeapons = ( { data = {} } ) => {
    const { 
        allUniqueRangedWeapons = [],
        allRangedWeapons = [] 
    } = data

    const rangedWeapons = [
        ...mapEdgesToNodes( allUniqueRangedWeapons ),
        ...mapEdgesToNodes( allRangedWeapons )
    ]

    return (
        <Layout>
            <Seo title='Ranged Weapons' />
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h2'
                        fontSize='4xl'
                        noOfLines={2}
                        mb={0}>
                        Ranged Weapons
                    </Heading>

                    <Grid
                        templateColumns={[
                            'repeat(3, 1fr)',
                            'repeat(2, 1fr)',
                            'repeat(3, 1fr)',
                            'repeat(5, 1fr)'
                        ]}
                        gap={6}>
                        {rangedWeapons &&
                            rangedWeapons.map( ( { node } ) => {
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
                                                    bgGradient={
                                                        node.isUnique
                                                            ? 'linear(to-tr, orange.500, orange.300)'
                                                            : 'linear(to-tr, gray.600, green.700)'
                                                    }
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
                                                        as='h3'
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

export default RangedWeapons
