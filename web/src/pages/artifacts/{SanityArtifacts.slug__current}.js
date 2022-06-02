/**
 * MC Dungeons Loot Hunter Artifacts
 */
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Tag,
    Text
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import ArmorTraits from '../../components/armor-traits/armor-traits'
import BackButton from '../../components/back-button/back-button'
import DlcItem from '../../components/dlc-item/dlc-item'
import EventItem from '../../components/event-item/event-item'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Locations from '../../components/locations/locations'
import LootVariants from '../../components/loot-variants/loot-variants'
import Runes from '../../components/runes/runes'
import { humanReadableTypeName } from '../../utils/helpers'

export const query = graphql`
    query ARTIFACT_COLLECTION ($id: String!) {
        sanityArtifacts(id: { eq: $id }) {
            type: _type
            title
            image {
                ...ImageWithPreview
            }
            requiresSouls
            isUnique
            variationOf: _rawVariationOf(resolveReferences: { maxDepth: 10 })
            runes: _rawRunes(resolveReferences: { maxDepth: 10 })
            traits
            dlcItem: _rawDlcItem(resolveReferences: { maxDepth: 10 })
            eventItem: _rawEventItem(resolveReferences: { maxDepth: 10 })
            obtainableOn: _rawObtainableOn(resolveReferences: { maxDepth: 10 })
        }
        uniqueVariants: allSanityArtifacts(
            filter: { variationOf: { id: { eq: $id } } }
        ) {
            edges {
                node {
                    id
                    type: _type
                    title
                    isUnique
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

const Artifact = ( { data = {} } ) => {
    const {
        sanityArtifacts: {
            type = '',
            title = '',
            image = {},
            isUnique = false,
            variationOf = {},
            requiresSouls = false,
            runes = [],
            traits = [],
            dlcItem = null,
            eventItem = null,
            obtainableOn = []
        },
        uniqueVariants = {}
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
                        <Stack direction='row' spacing={2}>
                            <Tag width='max' variant='solid'>
                                {humanReadableTypeName( type )}
                            </Tag>
                            {isUnique ? (
                                <Tag width='max' colorScheme='orange'>
                                    Unique
                                </Tag>
                            ) : (
                                <React.Fragment>
                                    <Tag width='max'>Common</Tag>
                                    <Tag width='max' colorScheme='green'>
                                        Rare
                                    </Tag>
                                </React.Fragment>
                            )}
                            {dlcItem.isDlcItem && (
                                <Tag width='max' colorScheme='green'>
                                    DLC
                                </Tag>
                            )}
                            {eventItem.isEventItem && (
                                <Tag width='max' colorScheme='purple'>
                                    Event
                                </Tag>
                            )}
                        </Stack>
                    </Stack>
                    <SimpleGrid columns={[1, 2]} spacing={10}>
                        <Box>
                            <Image
                                p={6}
                                imageData={image}
                                alt={title}
                                width={350}
                                height={350}
                                backgroundColor={isUnique ? 'orange.500' : null}
                                bgGradient={
                                    isUnique
                                        ? 'linear(to-tr, orange.500, orange.300)'
                                        : 'linear(to-tr, gray.600, green.700)'
                                }
                                borderRadius={2} />
                        </Box>
                        <Box>
                            <Stack direction='column' spacing={8}>
                                <LootVariants
                                    title={title}
                                    type={type}
                                    isUnique={isUnique}
                                    variationOf={variationOf}
                                    uniqueVariants={uniqueVariants} />
                                {requiresSouls && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Usage
                                        </Heading>
                                        <Text>💀 Requires souls</Text>
                                    </Stack>
                                )}
                                {traits.length !== 0 && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Traits
                                        </Heading>
                                        <ArmorTraits data={traits} />
                                    </Stack>
                                )}
                                <Stack direction='column' spacing={4}>
                                    <Heading as='h3' fontSize='xl'>
                                        Rune Value
                                    </Heading>
                                    <Runes data={runes} />
                                </Stack>

                                {dlcItem.isDlcItem && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            DLC
                                        </Heading>
                                        <DlcItem data={dlcItem} />
                                    </Stack>
                                )}
                                {eventItem.isEventItem && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Event
                                        </Heading>
                                        <EventItem data={eventItem} />
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </SimpleGrid>

                    {!eventItem.isEventItem && (
                        <SimpleGrid columns={[1, 2]} spacing={10}>
                            {obtainableOn && (
                                <Box>
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Locations
                                        </Heading>
                                        <Locations data={obtainableOn} />
                                    </Stack>
                                </Box>
                            )}
                        </SimpleGrid>
                    )}
                </Stack>
            </Container>
        </Layout>
    )
}

export default Artifact
