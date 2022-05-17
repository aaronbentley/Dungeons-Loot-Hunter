/**
 * Dungeons Loot Hunter Artifacts
 */
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Tag
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import ArmorTraits from '../../components/armor-traits/armor-traits'
import DlcItem from '../../components/dlc-item/dlc-item'
import EventItem from '../../components/event-item/event-item'
import Image from '../../components/image/image'
import IsUnique from '../../components/is-unique/is-unique'
import { Layout } from '../../components/layouts'
import Locations from '../../components/locations/locations'
import Runes from '../../components/runes/runes'
import { humanReadableTypeName } from '../../utils/generate-slug'

export const query = graphql`
    query ($id: String!) {
        sanityArtifacts(id: { eq: $id }) {
            type: _type
            title
            image {
                ...ImageWithPreview
            }
            requiresSouls
            isUnique
            runes: _rawRunes(resolveReferences: { maxDepth: 10 })
            traits
            isDlcItem: _rawIsDlcItem(resolveReferences: { maxDepth: 10 })
            isEventItem: _rawIsEventItem(resolveReferences: { maxDepth: 10 })
            obtainableOn: _rawObtainableOn(resolveReferences: { maxDepth: 10 })
        }
    }
`

const Artifact = ({ data = {} }) => {
    const {
        sanityArtifacts: {
            type = '',
            title = '',
            image = {},
            requiresSouls = false,
            isUnique = false,
            runes = [],
            traits = [],
            isDlcItem = null,
            isEventItem = null,
            obtainableOn = []
        }
    } = data

    return (
        <Layout>
            <Container maxWidth='6xl' py={24}>
                <Stack direction='column' spacing={12}>
                    <Stack direction='column' spacing={2}>
                        <Heading as='h1' fontSize='6xl' noOfLines={1} mb={0}>
                            {title}
                        </Heading>
                        <Stack direction='row' spacing={2}>
                            <Tag width='max' variant='solid'>
                                {humanReadableTypeName(type)}
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
                        </Stack>
                    </Stack>
                    <SimpleGrid columns={[1, 2]} spacing={10}>
                        <Box>
                            <Image
                                imageData={image}
                                alt={title}
                                width={350}
                                height={350}
                                backgroundColor={isUnique ? 'orange.500' : null}
                                bgGradient={
                                    !isUnique
                                        ? 'linear(to-tr, gray.600, green.600)'
                                        : null
                                }
                                borderRadius={2}
                            />
                        </Box>
                        <Box>
                            <Stack direction='column' spacing={8}>
                                <IsUnique
                                    title={title}
                                    type={type}
                                    isUnique={isUnique}
                                    variationOf={null}
                                />

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
                                        Runes
                                    </Heading>
                                    <Runes data={runes} />
                                </Stack>

                                {isDlcItem && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            DLC
                                        </Heading>
                                        <DlcItem data={isDlcItem} />
                                    </Stack>
                                )}
                                {isEventItem && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Event
                                        </Heading>
                                        <EventItem data={isEventItem} />
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={[1, 2]} spacing={10}>
                        <Box>
                            {obtainableOn && (
                                <Stack direction='column' spacing={4}>
                                    <Heading as='h3' fontSize='xl'>
                                        Locations
                                    </Heading>
                                    <Locations data={obtainableOn} />
                                </Stack>
                            )}
                        </Box>
                    </SimpleGrid>
                </Stack>
            </Container>
        </Layout>
    )
}

export default Artifact
