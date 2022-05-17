/**
 * Dungeons Loot Hunter Artifacts
 */
import { Container, Heading, Stack } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import ArtifactTraits from '../../components/artifact-traits/artifact-traits'
import DlcItem from '../../components/dlc-item/dlc-item'
import EventItem from '../../components/event-item/event-item'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Runes from '../../components/runes/runes'

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
            isEventItem = null
        }
    } = data

    return (
        <Layout>
            <Container maxWidth='6xl'>
            <Stack direction='column' spacing={12}>
                    <Heading as='h1'>{title}</Heading>
                    <Image
                        imageData={image}
                        alt={title}
                        width={168}
                        height={168}
                        backgroundColor={isUnique ? 'orange.500' : null}
                    />

                    <ArtifactTraits data={traits} />

                    <Runes data={runes} />

                    <DlcItem data={isDlcItem} />

                    <EventItem data={isEventItem} />
                </Stack>
            </Container>
        </Layout>
    )
}

export default Artifact