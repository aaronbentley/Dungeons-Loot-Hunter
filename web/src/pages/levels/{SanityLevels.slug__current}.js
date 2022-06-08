/**
 * MC Dungeons Loot Hunter Level
 */

import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    Tooltip,
    useBreakpointValue
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Link from '../../components/link/link'
import Seo from '../../components/seo/seo'
import { generateSlug, humanReadableTypeName, mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query LEVEL_COLLECTION ($id: String!) {
        sanityLevels(id: { eq: $id }) {
            type: _type
            title
            image {
                ...ImageWithPreview
            }
            location
            isDlc
            dlcTitle
        }
        meleeWeapons: allSanityMeleeWeapons(
            filter: { obtainableOn: { elemMatch: { id: { eq: $id } } } }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        uniqueMeleeWeapons: allSanityMeleeWeapons(
            filter: {
                variationOf: {
                    obtainableOn: { elemMatch: { id: { eq: $id } } }
                }
                eventItem: { isEventItem: { ne: true } }
            }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        rangedWeapons: allSanityRangedWeapons(
            filter: { obtainableOn: { elemMatch: { id: { eq: $id } } } }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        uniqueRangedWeapons: allSanityRangedWeapons(
            filter: {
                variationOf: {
                    obtainableOn: { elemMatch: { id: { eq: $id } } }
                }
                eventItem: { isEventItem: { ne: true } }
            }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        armor: allSanityArmor(
            filter: { obtainableOn: { elemMatch: { id: { eq: $id } } } }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        uniqueArmor: allSanityArmor(
            filter: {
                variationOf: {
                    obtainableOn: { elemMatch: { id: { eq: $id } } }
                }
                eventItem: { isEventItem: { ne: true } }
            }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        artifacts: allSanityArtifacts(
            filter: { obtainableOn: { elemMatch: { id: { eq: $id } } } }
        ) {
            edges {
                node {
                    _type
                    id
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
    }
`

const Level = ( { data = {} } ) => {
    const {
        sanityLevels: {
            type = '',
            title = '',
            image = {},
            location = []
        },
        meleeWeapons = {},
        uniqueMeleeWeapons = {},
        rangedWeapons = {},
        uniqueRangedWeapons = {},
        armor = {},
        uniqueArmor = {},
        artifacts = {}
    } = data

    // Merge loot drops into collection & map edges to nodes
    const lootDrops = [
        ...mapEdgesToNodes( uniqueMeleeWeapons ),
        ...mapEdgesToNodes( uniqueRangedWeapons ),
        ...mapEdgesToNodes( uniqueArmor ),
        ...mapEdgesToNodes( meleeWeapons ),
        ...mapEdgesToNodes( rangedWeapons ),
        ...mapEdgesToNodes( armor ),
        ...mapEdgesToNodes( artifacts )
    ]

    // Generate dynamic image thumbnail sizing relative to viewport
    const imageWidthSizes = useBreakpointValue( {
        base: 382,
        sm: 384,
        md: 460,
        lg: 540
    } )

    return (
        <Layout>
            <Seo title={`${title} | ${humanReadableTypeName( type )}`} />
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Stack direction='column' spacing={2}>
                        <Heading
                            as='h2'
                            fontSize='4xl'
                            noOfLines={2}
                            mb={0}>
                            {title}
                        </Heading>
                    </Stack>
                    <SimpleGrid columns={[1, 2]} spacing={10}>
                        <Box>
                            <Image
                                imageData={image}
                                loading='eager'
                                alt={title}
                                width={imageWidthSizes}
                                borderRadius={2} />
                        </Box>
                        <Box>
                            <Stack direction='column' spacing={8}>
                                {location && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                        Location
                                        </Heading>
                                        {location.map( location => {
                                            return (
                                                <Text textTransform='capitalize'>{location.replace( '-', ' ' )}</Text>
                                            )
                                        } )}
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </SimpleGrid>
                    {lootDrops && (
                        <Stack direction='column' spacing={4}>
                            <Heading as='h3' fontSize='4xl'>
                                Loot drops
                            </Heading>
                            <SimpleGrid columns={[3, 2, 3, 8]} spacing={2}>
                                {lootDrops.map( ( { node }, index ) => (
                                    <Tooltip
                                        key={node.id}
                                        label={node.title}
                                        placement='top'
                                        colorScheme='purple'
                                        shouldWrapChildren>
                                        <Link
                                            to={`/${generateSlug(
                                                node._type
                                            )}/${node.slug.current}/`}>
                                            <Image
                                                imageData={node.image}
                                                alt={node.title}
                                                loading={( index <= 16 ? 'eager' : 'lazy' )}
                                                // width={imageWidthSizes}
                                                p={2}
                                                bgGradient={
                                                    node.isUnique
                                                        ? 'linear(to-tr, orange.500, orange.300)'
                                                        : 'linear(to-tr, gray.600, green.700)'
                                                }
                                                borderRadius={2} />
                                        </Link>
                                    </Tooltip>
                                )
                                )}
                            </SimpleGrid>
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Layout>
    )
}

export default Level
