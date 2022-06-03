/**
 * MC Dungeons Loot Hunter Ancient Mob
 */

import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Stack, Tooltip,
    useBreakpointValue
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
    query ANCIENT_MOB_COLLECTION($id: String!) {
        sanityAncientMobs(id: { eq: $id }) {
            id
            # type: _type
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
                    isUnique
                }
            }
        }
        uniqueMeleeWeapons: allSanityMeleeWeapons(
            filter: {
                variationOf: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                    isUnique
                }
            }
        }
        uniqueRangedWeapons: allSanityRangedWeapons(
            filter: {
                variationOf: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
                    isUnique
                }
            }
        }
        uniqueArmor: allSanityArmor(
            filter: {
                variationOf: { droppedBy: { elemMatch: { id: { eq: $id } } } }
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
        allMeleeWeapons: allSanityMeleeWeapons {
            edges {
                node {
                    _type
                    id
                    title
                    runeValues: _rawRunes(resolveReferences: { maxDepth: 10 })
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
        allRangedWeapons: allSanityRangedWeapons {
            edges {
                node {
                    _type
                    id
                    title
                    runeValues: _rawRunes(resolveReferences: { maxDepth: 10 })
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
        allArmor: allSanityArmor {
            edges {
                node {
                    _type
                    id
                    title
                    runeValues: _rawRunes(resolveReferences: { maxDepth: 10 })
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
        allArtifacts: allSanityArtifacts {
            edges {
                node {
                    _type
                    id
                    title
                    runeValues: _rawRunes(resolveReferences: { maxDepth: 10 })
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

const AncientMob = ( { data = {} } ) => {
    const {
        sanityAncientMobs: {
            // type = '',
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
        uniqueArmor = {},
        allMeleeWeapons = {},
        allRangedWeapons = {},
        allArmor = {},
        allArtifacts = {}
    } = data

    // console.log( '🦄 ~ file: {SanityAncientMobs.slug__current}.js ~ line 181 ~ AncientMob ~ runeRequirements', runeRequirements )

    // console.log( '🦄 ~ file: {SanityAncientMobs.slug__current}.js ~ line 189 ~ AncientMob ~ allMeleeWeapons', allMeleeWeapons )

    // Merge loot drops into collection & map edges to nodes
    const lootDrops = [
        ...mapEdgesToNodes( uniqueMeleeWeapons ),
        ...mapEdgesToNodes( uniqueRangedWeapons ),
        ...mapEdgesToNodes( uniqueArmor ),
        ...mapEdgesToNodes( meleeWeapons ),
        ...mapEdgesToNodes( rangedWeapons ),
        ...mapEdgesToNodes( armor )
    ]

    // Merge all loot items into collection & map edges to nodes
    const allLootItems = [
        ...mapEdgesToNodes( allMeleeWeapons ),
        ...mapEdgesToNodes( allRangedWeapons ),
        ...mapEdgesToNodes( allArmor ),
        ...mapEdgesToNodes( allArtifacts )
    ]

    // 1. Loops through all loot items
    const itemsWithRunes = allLootItems.filter( ( { node: { title = '', runeValues = [] } } ) => {
        // 2. Check each items rune value(s) by id
        return runeValues.some( ( { id: runeValueID } ) => {
            // 3. Check if items rune value appears in rune requirements
            return runeRequirements.some( ( { id: runeRequirementID } ) => {
                // 4. Return true if IDs match
                return runeValueID === runeRequirementID
            } )
        } )
    } )

    // console.log( '🦄 ~ itemsWithRunes', itemsWithRunes )

    // Generate dynamic image thumbnail sizing relative to viewport
    const imageWidthSizes = useBreakpointValue( {
        base: 478,
        sm: 360,
        md: 310,
        lg: 175
    } )

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
                                imageData={image}
                                alt={title}
                                width={350}
                                height={350}
                                borderRadius={2} />
                        </Box>

                        <Box>
                            <Stack direction='column' spacing={8}>
                                {enchantments && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Enchantments
                                        </Heading>
                                        <BuiltInEnchantments
                                            data={enchantments} />
                                    </Stack>
                                )}
                                <Stack direction='column' spacing={4}>
                                    <Heading as='h3' fontSize='xl'>
                                        Rune offering required
                                    </Heading>
                                    <Runes data={runeRequirements} />
                                </Stack>
                                <Stack direction='column' spacing={4}>
                                    <Heading as='h3' fontSize='xl'>
                                        Items with required runes
                                    </Heading>
                                    <SimpleGrid columns={5} spacing={2}>
                                        {itemsWithRunes.map( ( { node } ) => (
                                            <Tooltip
                                                key={node.id}
                                                label={node.title}
                                                placement='top'
                                                shouldWrapChildren>
                                                <Link
                                                    to={`/${generateSlug( node._type )}/${node.slug.current}/`}>
                                                    <Image
                                                        imageData={node.image}
                                                        alt={node.title}
                                                        width={102}
                                                        p={2}
                                                        bgGradient={
                                                            node.isUnique
                                                                ? 'linear(to-tr, orange.500, orange.300)'
                                                                : 'linear(to-tr, gray.600, green.700)'
                                                        }
                                                        borderRadius={2} />
                                                </Link>
                                            </Tooltip>
                                        ) )}
                                    </SimpleGrid>
                                </Stack>
                            </Stack>
                        </Box>
                    </SimpleGrid>
                    {lootDrops && (
                        <Stack direction='column' spacing={4}>
                            <Heading as='h3' fontSize='4xl'>
                                Guilded Loot drops
                            </Heading>
                            <SimpleGrid columns={[1, 2, 3, 6]} spacing={4}>
                                {lootDrops.map( ( { node } ) => {
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
                                                )}/${node.slug.current}/`}>
                                                <Image
                                                    imageData={node.image}
                                                    alt={node.title}
                                                    // width={175}
                                                    width={imageWidthSizes}
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
                                } )}
                            </SimpleGrid>
                        </Stack>
                    )}
                </Stack>
            </Container>
        </Layout>
    )
}

export default AncientMob
