/**
 * MC Dungeons Loot Hunter Armor
 */

import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Tag,
    useBreakpointValue
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import AncientMobs from '../../components/ancient-mobs/ancient-mobs'
import BuiltInAbilities from '../../components/built-in-abilities/built-in-abilities'
import BuiltInEnchantments from '../../components/built-in-enchantments/built-in-enchantments'
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
    query ARMOR_COLLECTION($id: String!) {
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
            dlcItem: _rawDlcItem(resolveReferences: { maxDepth: 10 })
            eventItem: _rawEventItem(resolveReferences: { maxDepth: 10 })
            obtainableOn: _rawObtainableOn(resolveReferences: { maxDepth: 10 })
            droppedBy: _rawDroppedBy(resolveReferences: { maxDepth: 10 })
        }
        uniqueVariants: allSanityArmor(
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

const Armor = ( { data = {} } ) => {
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
            dlcItem = null,
            eventItem = null,
            obtainableOn = [],
            droppedBy = []
        },
        uniqueVariants = {}
    } = data

    // Generate dynamic image thumbnail sizing relative to viewport
    const imageWidthSizes = useBreakpointValue( {
        base: 382,
        sm: 384,
        md: 460,
        lg: 540
    } )

    return (
        <Layout>
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Stack direction='column' spacing={2}>
                        <Heading
                            as='h1'
                            fontSize={['4xl', '6xl']}
                            noOfLines={2}
                            mb={0}>
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
                                width={imageWidthSizes}
                                backgroundColor={isUnique ? 'orange.500' : null}
                                objectFit='contain'
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

                                <BuiltInAbilities data={builtInAbilities} />
                                <Traits data={traits} />
                                <BuiltInEnchantments
                                    data={builtInEnchantments} />
                                <Runes title='Rune value' data={runes} />
                                <BuiltInAbilities data={builtInAbilities} />
                                <DlcItem data={dlcItem} />
                                <EventItem data={eventItem} />
                            </Stack>
                        </Box>
                    </SimpleGrid>
                    {!eventItem.isEventItem && (
                        <SimpleGrid columns={[1, 2]} spacing={10}>
                            <Box>
                                <AncientMobs
                                    data={isUnique ? variationOf : droppedBy} />
                            </Box>
                            <Box>
                                <Locations
                                    data={isUnique ? variationOf : obtainableOn} />
                            </Box>
                        </SimpleGrid>
                    )}
                </Stack>
            </Container>
        </Layout>
    )
}

export default Armor
