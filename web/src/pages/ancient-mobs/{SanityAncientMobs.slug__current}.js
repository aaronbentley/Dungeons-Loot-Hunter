/**
 * MC Dungeons Loot Hunter Ancient Mob
 */

import {
    Box,
    Container,
    Heading,
    LinkBox,
    LinkOverlay,
    SimpleGrid,
    Stack,
    Tooltip,
    useBreakpointValue
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Link from '../../components/link/link'
import Runes from '../../components/runes/runes'
import Seo from '../../components/seo/seo'
import { generateSlug, humanReadableTypeName, mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query ANCIENT_MOB_COLLECTION($id: String!) {
        sanityAncientMobs(id: { eq: $id }) {
            id
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
            type = '',
            title = '',
            image = {},
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

    // Map runes Requirements to flat array
    const runeRequirementIds = runeRequirements.map( ( { id } ) => id )

    // 1. Loops through all loot items
    const itemsWithRunes = allLootItems.filter(
        ( { node: { runeValues = [] } } ) => {
            // 2. Check each items rune value(s) by id
            return runeValues.some( ( { id: runeValueID } ) => {
                // 3. Check if items rune value appears in rune requirements
                return runeRequirements.some( ( { id: runeRequirementID } ) => {
                    // 4. Return true if IDs match
                    return runeValueID === runeRequirementID
                } )
            } )
        }
    )

    // Generate dynamic image thumbnail sizing relative to viewport
    const imageWidthSizes = useBreakpointValue( {
        base: 447,
        sm: 384,
        md: 460,
        lg: 540
    } )

    const gildedlootDropsimageWidthSizes = useBreakpointValue( {
        base: 144,
        sm: 170,
        md: 148,
        lg: 84
    } )

    const requiredRunesimageWidthSizes = useBreakpointValue( {
        base: 144,
        sm: 170,
        md: 148,
        lg: 133
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
                                <Runes
                                    title='Rune offering required'
                                    data={runeRequirements} />
                                {lootDrops && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Gilded Loot drops
                                        </Heading>
                                        <SimpleGrid
                                            columns={[3, 2, 3, 6]}
                                            spacing={2}>
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
                                                            )}/${
                                                                node.slug
                                                                    .current
                                                            }/`}>
                                                            <Image
                                                                imageData={
                                                                    node.image
                                                                }
                                                                alt={node.title}
                                                                width={
                                                                    gildedlootDropsimageWidthSizes
                                                                }
                                                                p={2}
                                                                bgGradient={
                                                                    // node.isUnique
                                                                    //     ? 'linear(to-tr, orange.500, orange.300)'
                                                                    //     : 'linear(to-tr, gray.600, green.700)'
                                                                    'linear(to-tr, yellow.500, yellow.300)'
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
                        </Box>
                    </SimpleGrid>
                    <Stack direction='column' spacing={4}>
                        <Heading as='h3' fontSize='xl'>
                            Items with required runes
                        </Heading>
                        <SimpleGrid 
                            columns={[3, 4, 6, 8]} 
                            spacing={2}>
                            {itemsWithRunes.map( ( { node } ) => (
                                <Tooltip
                                    key={node.id}
                                    label={node.title}
                                    placement='top'
                                    shouldWrapChildren>
                                    <LinkBox position='relative'>
                                        <LinkOverlay
                                            as={Link}
                                            to={`/${generateSlug( node._type )}/${
                                                node.slug.current
                                            }/`}>
                                            <Image
                                                imageData={node.image}
                                                alt={node.title}
                                                width={requiredRunesimageWidthSizes}
                                                p={2}
                                                bgGradient={
                                                    node.isUnique
                                                        ? 'linear(to-tr, orange.500, orange.300)'
                                                        : 'linear(to-tr, gray.600, green.700)'
                                                }
                                                borderRadius={2} />
                                        </LinkOverlay>
                                        <SimpleGrid
                                            p={1}
                                            columns={3}
                                            spacing={1}
                                            position='absolute'
                                            bottom={0}
                                            pointerEvents='none'>
                                            {node.runeValues.map( ( rune ) => {
                                                if (
                                                    runeRequirementIds.includes(
                                                        rune.id
                                                    )
                                                ) {
                                                    return (
                                                        <Image
                                                            key={rune.id}
                                                            imageData={
                                                                rune.image
                                                            }
                                                            alt={rune.title}
                                                            width={46}
                                                            p={0}
                                                            borderRadius={2} />
                                                    )
                                                }

                                                return null
                                            } )}
                                        </SimpleGrid>
                                    </LinkBox>
                                </Tooltip>
                            ) )}
                        </SimpleGrid>
                    </Stack>
                </Stack>
            </Container>
        </Layout>
    )
}

export default AncientMob
