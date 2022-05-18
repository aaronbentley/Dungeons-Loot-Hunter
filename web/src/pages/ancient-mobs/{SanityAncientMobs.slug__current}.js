/**
 * Dungeons Loot Hunter Ancient Mob
 */

import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Tooltip
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import BackButton from '../../components/back-button/back-button'
import BuiltInEnchantments from '../../components/built-in-enchantments/built-in-enchantments'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Link from '../../components/link/link'
import Runes from '../../components/runes/runes'
import { generateSlug, mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query ($id: String!) {
        sanityAncientMobs(id: { eq: $id }) {
            type: _type
            title
            image {
                ...ImageWithPreview
            }
            enchantments: _rawEnchantments(resolveReferences: { maxDepth: 10 })
            runeRequirements: _rawRuneRequirements(
                resolveReferences: { maxDepth: 10 }
            )
        }
        meleeWeapons: allSanityMeleeWeapons(
            filter: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                }
            }
        }
        uniqueMeleeWeapons: allSanityMeleeWeapons(
            filter: {
                variationOf: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                }
            }
        }
        rangedWeapons: allSanityRangedWeapons(
            filter: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                }
            }
        }
        uniqueRangedWeapons: allSanityRangedWeapons(
            filter: {
                variationOf: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                }
            }
        }
        armor: allSanityArmor(
            filter: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                }
            }
        }
        uniqueArmor: allSanityArmor(
            filter: {
                variationOf: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                }
            }
        }
    }
`

const AncientMob = ({ data = {} }) => {
    const {
        sanityAncientMobs: {
            type = '',
            title = '',
            image = {},
            enchantments = [],
            runeRequirements = []
        },
        meleeWeapons = {},
        uniqueMeleeWeapons = {},
        rangedWeapons = {},
        uniqueRangedWeapons = {},
        armor = {},
        uniqueArmor = {}
    } = data

    // Merge loot drops into collection & map edges to nodes
    const lootDrops = [
        ...mapEdgesToNodes(meleeWeapons),
        ...mapEdgesToNodes(uniqueMeleeWeapons),
        ...mapEdgesToNodes(rangedWeapons),
        ...mapEdgesToNodes(uniqueRangedWeapons),
        ...mapEdgesToNodes(armor),
        ...mapEdgesToNodes(uniqueArmor)
    ]

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

                        <Box>
                            <Stack direction='column' spacing={8}>
                                {enchantments && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Enchantments
                                        </Heading>
                                        <BuiltInEnchantments
                                            data={enchantments}
                                        />
                                    </Stack>
                                )}
                                <Stack direction='column' spacing={4}>
                                    <Heading as='h3' fontSize='xl'>
                                        Rune offering
                                    </Heading>
                                    <Runes data={runeRequirements} />
                                </Stack>
                                {lootDrops && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Loot drops
                                        </Heading>
                                        <Stack direction='row' spacing={2}>
                                            {lootDrops.map(({ node }) => {
                                                return (
                                                    <Tooltip
                                                        key={node.id}
                                                        label={node.title}
                                                        placement='top'
                                                        colorScheme='purple'
                                                        shouldWrapChildren>
                                                        <Link
                                                            to={`/${generateSlug(
                                                                node._type
                                                            )}/${
                                                                node.slug
                                                                    .current
                                                            }/`}>
                                                            <Image
                                                                imageData={
                                                                    node.image
                                                                }
                                                                alt={node.title}
                                                                width={42}
                                                            />
                                                        </Link>
                                                    </Tooltip>
                                                )
                                            })}
                                        </Stack>
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </SimpleGrid>
                </Stack>
            </Container>
        </Layout>
    )
}

export default AncientMob
