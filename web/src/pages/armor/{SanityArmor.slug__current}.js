/**
 * Dungeons Loot Hunter Armor
 */

import { Container, Heading, Stack } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import ArmorTraits from '../../components/armor-traits/armor-traits'
import BuiltInAbilities from '../../components/built-in-abilities/built-in-abilities'
import BuiltInEnchantments from '../../components/built-in-enchantments/built-in-enchantments'
import DlcItem from '../../components/dlc-item/dlc-item'
import EventItem from '../../components/event-item/event-item'
import Image from '../../components/image/image'
import IsUnique from '../../components/is-unique/is-unique'
import { Layout } from '../../components/layouts'
import Runes from '../../components/runes/runes'

export const query = graphql`
    query ($id: String!) {
        sanityArmor(id: { eq: $id }) {
            type: _type
            title
            image {
                ...ImageWithPreview
            }
            builtInAbilities: _rawBuiltInAbilities(
                resolveReferences: { maxDepth: 10 }
            )
            traits
            isUnique
            variationOf: _rawVariationOf(resolveReferences: { maxDepth: 10 })
            builtInEnchantments: _rawBuiltInEnchantments(
                resolveReferences: { maxDepth: 10 }
            )
            runes: _rawRunes(resolveReferences: { maxDepth: 10 })
            isDlcItem: _rawIsDlcItem(resolveReferences: { maxDepth: 10 })
            isEventItem: _rawIsEventItem(resolveReferences: { maxDepth: 10 })
        }
    }
`

const Armor = ({ data = {} }) => {
    const {
        sanityArmor: {
            type = '',
            title = '',
            image = {},
            builtInAbilities = [],
            traits = [],
            isUnique = false,
            variationOf = {},
            builtInEnchantments = [],
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
                        variationOf={variationOf}
                    />

                    <BuiltInEnchantments data={builtInEnchantments} />

                    <BuiltInAbilities data={builtInAbilities} />

                    <ArmorTraits data={traits} />

                    <Runes data={runes} />

                    <DlcItem data={isDlcItem} />

                    <EventItem data={isEventItem} />
                </Stack>
            </Container>
        </Layout>
    )
}

export default Armor
