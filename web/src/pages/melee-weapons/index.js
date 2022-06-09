/**
 * MC Dungeons Loot Hunter Melee Weapons index
 */
import {
    Container,
    Grid,
    GridItem,
    Heading,
    LinkBox,
    LinkOverlay,
    Stack,
    useBreakpointValue
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Link from '../../components/link/link'
import Seo from '../../components/seo/seo'
import { generateSlug, mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query MELEE_WEAPON_INDEX {
        allUniqueMeleeWeapons: allSanityMeleeWeapons(
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
        allMeleeWeapons: allSanityMeleeWeapons(
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

const MeleeWeapons = ( { data = {} } ) => {
    const { 
        allUniqueMeleeWeapons = [],
        allMeleeWeapons = [] 
    } = data

    const meleeWeapons = [
        ...mapEdgesToNodes( allUniqueMeleeWeapons ),
        ...mapEdgesToNodes( allMeleeWeapons )
    ]

    // Generate dynamic image thumbnail sizing relative to viewport
    const imageWidthSizes = useBreakpointValue( {
        base: 133,
        sm: 228,
        md: 304,
        lg: 205
    } )

    return (
        <Layout>
            <Seo title='Melee Weapons' />
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h2'
                        fontSize='4xl'
                        noOfLines={2}
                        mb={0}>
                        Melee Weapons
                    </Heading>
                    <Grid
                        templateColumns={[
                            'repeat(3, 1fr)',
                            null,
                            null,
                            'repeat(5, 1fr)'
                        ]}
                        gap={6}>
                        {meleeWeapons &&
                            meleeWeapons.map( ( { node }, index ) => (
                                <GridItem key={node.id}>
                                    <LinkBox>
                                        <Stack
                                            direction='column'
                                            spacing={2}>
                                            <Image
                                                padding={2}
                                                loading={( index <= 30 ? 'eager' : 'lazy' )}
                                                imageData={node.image}
                                                alt={node.title}
                                                width={imageWidthSizes}
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
                            )}
                    </Grid>
                </Stack>
            </Container>
        </Layout>
    )
}

export default MeleeWeapons
