/**
 * MC Dungeons Loot Hunter Melee Weapon
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
import AncientMobs from '../../components/ancient-mobs/ancient-mobs'
import BackButton from '../../components/back-button/back-button'
import BuiltInAbilities from '../../components/built-in-abilities/built-in-abilities'
import BuiltInEnchantments from '../../components/built-in-enchantments/built-in-enchantments'
import DlcItem from '../../components/dlc-item/dlc-item'
import EventItem from '../../components/event-item/event-item'
import Image from '../../components/image/image'
import IsUnique from '../../components/is-unique/is-unique'
import { Layout } from '../../components/layouts'
import Locations from '../../components/locations/locations'
import Runes from '../../components/runes/runes'
import Stats from '../../components/stats/stats'
import { humanReadableTypeName } from '../../utils/helpers'

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
            builtInEnchantments: _rawBuiltInEnchantments(
                resolveReferences: { maxDepth: 10 }
            )
            runes: _rawRunes(resolveReferences: { maxDepth: 10 })
            isDlcItem: _rawIsDlcItem(resolveReferences: { maxDepth: 10 })
            isEventItem: _rawIsEventItem(resolveReferences: { maxDepth: 10 })
            obtainableOn: _rawObtainableOn(resolveReferences: { maxDepth: 10 })
            droppedBy: _rawDroppedBy(resolveReferences: { maxDepth: 10 })
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
            builtInEnchantments = [],
            runes = [],
            isDlcItem: { isDlcItem = null },
            isEventItem: { isEventItem = null },
            obtainableOn = [],
            droppedBy = []
        }
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
                            {isDlcItem?.isDlcItem && (
                                <Tag width='max' colorScheme='green'>
                                    DLC
                                </Tag>
                            )}
                            {isEventItem?.isEventItem && (
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
                                // backgroundColor={isUnique ? 'orange.500' : null}
                                bgGradient={
                                    isUnique
                                        ? 'linear(to-tr, orange.500, orange.300)'
                                        : 'linear(to-tr, gray.600, green.700)'
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
                                    variationOf={variationOf}
                                />
                                <Stack direction='column' spacing={4}>
                                    <Heading as='h3' fontSize='xl'>
                                        Stats
                                    </Heading>
                                    <Stats type={type} data={stats} />
                                </Stack>
                                {builtInEnchantments && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Enchantments
                                        </Heading>
                                        <BuiltInEnchantments
                                            data={builtInEnchantments}
                                        />
                                    </Stack>
                                )}
                                <Stack direction='column' spacing={4}>
                                    <Heading as='h3' fontSize='xl'>
                                        Runes
                                    </Heading>
                                    <Runes data={runes} />
                                </Stack>
                                {builtInAbilities && (
                                    <Stack direction='column' spacing={4}>
                                        <Heading as='h3' fontSize='xl'>
                                            Built-in Abilities
                                        </Heading>
                                        <BuiltInAbilities
                                            data={builtInAbilities}
                                        />
                                    </Stack>
                                )}
                                {isDlcItem.isDlcItem && (
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
                            <Stack direction='column' spacing={4}>
                                <Heading as='h3' fontSize='xl'>
                                    Locations
                                </Heading>
                                <Locations
                                    data={isUnique ? variationOf : obtainableOn}
                                />
                            </Stack>
                        </Box>
                        <Box>
                            <Stack direction='column' spacing={4}>
                                <Heading as='h3' fontSize='xl'>
                                    Ancient Mobs
                                </Heading>
                                <AncientMobs
                                    data={isUnique ? variationOf : droppedBy}
                                />
                            </Stack>
                        </Box>
                    </SimpleGrid>
                </Stack>
            </Container>
        </Layout>
    )
}

export default MeleeWeapon
