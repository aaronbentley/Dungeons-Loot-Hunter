/**
 * MC Dungeons Loot Hunter Armor index
 */
import {
    Container,
    Grid,
    GridItem,
    Heading,
    LinkBox,
    LinkOverlay,
    Stack
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import Image from '../../components/image/image'
import { Layout } from '../../components/layouts'
import Link from '../../components/link/link'
import Seo from '../../components/seo/seo'
import { generateSlug, mapEdgesToNodes } from '../../utils/helpers'

export const query = graphql`
    query ARMOR_INDEX {
        allUniqueArmor: allSanityArmor(
            sort: { fields: title, order: ASC }
            filter: { isUnique: { eq: true } }
        ) {
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
        allArmor: allSanityArmor(
            sort: { fields: title, order: ASC }
            filter: { isUnique: { ne: true } }
        ) {
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

const Armor = ( { data = {} } ) => {
    const { 
        allUniqueArmor = [],
        allArmor = [] 
    } = data

    const armor = [
        ...mapEdgesToNodes( allUniqueArmor ),
        ...mapEdgesToNodes( allArmor )
    ]

    return (
        <Layout>
            <Seo title='Armor' />
            <Container maxWidth='6xl' py={12}>
                <Stack direction='column' spacing={12}>
                    <Heading
                        as='h1'
                        fontSize={['4xl', '6xl']}
                        noOfLines={2}
                        mb={0}>
                        Armor
                    </Heading>
                    <Grid
                        templateColumns={[
                            'repeat(3, 1fr)',
                            'repeat(2, 1fr)',
                            'repeat(3, 1fr)',
                            'repeat(5, 1fr)'
                        ]}
                        gap={6}>
                        {armor &&
                            armor.map( ( { node } ) => {
                                return (
                                    <GridItem key={node.id}>
                                        <LinkBox>
                                            <Stack
                                                direction='column'
                                                spacing={2}>
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
                                                    to={`/${generateSlug(
                                                        node._type
                                                    )}/${
                                                        node.slug
                                                            .current
                                                    }/`}
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

export default Armor
