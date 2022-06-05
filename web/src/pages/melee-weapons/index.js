/**
 * MC Dungeons Loot Hunter Melee Weapons index
 */
import { Container, Grid, GridItem, Heading, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Link from '../../components/link/link'
import { mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query MELEE_WEAPON_INDEX {
        allMeleeWeapons: allSanityMeleeWeapons(sort: { fields: title, order: ASC }) {
            edges {
                node {
                    _type
                    id
                    title
                    slug {
                        current
                    }
                    isUnique
                    image {
                        ...ImageWithPreview
                    }
                }
            }
        }
    }
`

const MeleeWeapons = ( { data = {} } ) => {

    const  { allMeleeWeapons = [] } = data
    const meleeWeapons = mapEdgesToNodes( allMeleeWeapons )
    console.log( '🦄 ~ file: index.js ~ line 37 ~ MeleeWeapons ~ meleeWeapons', meleeWeapons )

    return (
        <Layout>
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h1'
                        fontSize={['4xl', '6xl']}
                        noOfLines={2}
                        mb={0}>
                        Melee Weapons
                    </Heading>
                
                    <Grid 
                        templateColumns={[
                            'repeat(3, 1fr)',
                            'repeat(2, 1fr)',
                            'repeat(3, 1fr)',
                            'repeat(5, 1fr)'
                        ]} 
                        gap={6}>
                        {meleeWeapons &&
                        meleeWeapons.map( ( {node } ) => {
                            return (
                                <GridItem key={node.id}>
                                    <LinkBox>
                                        <Stack direction='column' spacing={2}>
                                            <Image
                                                padding={2}
                                                imageData={node.image}
                                                alt={node.title}
                                                width={280}
                                                bgGradient={
                                                    node.isUnique
                                                        ? 'linear(to-tr, orange.500, orange.300)'
                                                        : 'linear(to-tr, gray.600, green.700)'
                                                }
                                                borderRadius={2} />
                                            <LinkOverlay
                                                as={Link}
                                                to={node.url}
                                                _hover={{
                                                    textDecoration: 'none'
                                                }}>
                                                <Heading
                                                    as='h4'
                                                    fontSize={['xs', 'lg']}
                                                    noOfLines={2}
                                                    pt={2}
                                                    pb={4}>
                                                    {node.title}
                                                </Heading>
                                            </LinkOverlay>
                                        </Stack>
                                    </LinkBox>
                                </GridItem>
                            )
                        } )}
                    </Grid>
                </Stack>
            </Container>
        </Layout>
    )
}

export default MeleeWeapons
