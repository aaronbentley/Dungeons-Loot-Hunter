/**
 * Dungeons Loot Hunter Melee Weapon
 */

import { Container, Heading, Stack } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import BuiltInAbilities from '../../components/built-in-abilities/built-in-abilities'
import DlcItem from '../../components/dlc-item/dlc-item'
import EventItem from '../../components/event-item/event-item'
import Image from '../../components/image/image'
import IsUnique from '../../components/is-unique/is-unique'
import Layout from '../../components/layout/layout'
import Runes from '../../components/runes/runes'
import Stats from '../../components/stats/stats'

export const query = graphql`
    query ($id: String!) {
        sanityMeleeWeapons(id: { eq: $id }) {
            type: _type
            title
            image {
                ...ImageWithPreview
            }
            stats: _rawStats
            builtInAbilities: _rawBuiltInAbilities(
                resolveReferences: { maxDepth: 10 }
            )
            isUnique
            variationOf: _rawVariationOf(resolveReferences: { maxDepth: 10 })
            runes: _rawRunes(resolveReferences: { maxDepth: 10 })
            isDlcItem: _rawIsDlcItem(resolveReferences: { maxDepth: 10 })
            isEventItem: _rawIsEventItem(resolveReferences: { maxDepth: 10 })
        }
    }
`

const MeleeWeapon = ({ data = {} }) => {
    const {
        sanityMeleeWeapons: {
            type = '',
            title = '',
            image = {},
            stats = {},
            builtInAbilities = [],
            isUnique = false,
            variationOf = {},
            runes = [],
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

                    <IsUnique 
                        title={title} 
                        type={type}
                        isUnique={isUnique} 
                        variationOf={variationOf} />

                    <Stats type={type} data={stats} />

                    <BuiltInAbilities data={builtInAbilities} />

                    <Runes data={runes} />

                    <DlcItem data={isDlcItem} />

                    <EventItem data={isEventItem} />
                </Stack>
            </Container>
        </Layout>
    )
}

export default MeleeWeapon
