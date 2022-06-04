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
import BackButton from '../../components/back-button/back-button'
import DlcItem from '../../components/dlc-item/dlc-item'
import EventItem from '../../components/event-item/event-item'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Locations from '../../components/locations/locations'
import LootVariants from '../../components/loot-variants/loot-variants'
import Runes from '../../components/runes/runes'
import Traits from '../../components/traits/traits'
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
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Stack direction='column' spacing={2}>
                        <BackButton />
                        <Heading as='h1' fontSize={['4xl', '6xl']} noOfLines={2} mb={0}>
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
                                <Tag width='max' colorScheme='blue'>
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

                                <Traits data={traits} />
                                <Runes title='Rune Value' data={runes} />
                                <DlcItem data={dlcItem} />
                                <EventItem data={eventItem} />
                            </Stack>
                        </Box>
                    </SimpleGrid>

                    {!eventItem.isEventItem && (
                        <SimpleGrid columns={[1, 2]} spacing={10}>
                            {obtainableOn && (
                                <Box>
                                    <Locations data={obtainableOn} />
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
