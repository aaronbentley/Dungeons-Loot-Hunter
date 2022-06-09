/**
 * MC Dungeons Loot Hunter Index
 */
import {
    Container,
    Heading,
    LinkBox,
    LinkOverlay,
    SimpleGrid,
    Stack,
    useBreakpointValue
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React from 'react'
import Image from '../components/image/image'
import { Layout } from '../components/layouts'
import Link from '../components/link/link'
import Seo from '../components/seo/seo'
import { generateSlug, mapEdgesToNodes } from '../utils/helpers'

export const query = graphql`
    query INDEX_PAGE {
        allMeleeWeapons: allSanityMeleeWeapons(
            filter: { isFeatured: { eq: true } }
            limit: 4
        ) {
            edges {
                node {
                    id
                    type: _type
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        allRangedWeapons: allSanityRangedWeapons(
            filter: { isFeatured: { eq: true } }
            limit: 4
        ) {
            edges {
                node {
                    id
                    type: _type
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        allArmor: allSanityArmor(
            filter: { isFeatured: { eq: true } }
            limit: 4
        ) {
            edges {
                node {
                    id
                    type: _type
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
        allArtifacts: allSanityArtifacts(
            filter: { isFeatured: { eq: true } }
            limit: 4
        ) {
            edges {
                node {
                    id
                    type: _type
                    title
                    image {
                        ...ImageWithPreview
                    }
                    slug {
                        current
                    }
                    isUnique
                }
            }
        }
    }
`

const Index = ( { data = {} } ) => {
    const {
        allMeleeWeapons = [],
        allRangedWeapons = [],
        allArmor = [],
        allArtifacts = []
    } = data

    const featuredMeleeWeapons = mapEdgesToNodes( allMeleeWeapons )
    const featuredRangedWeapons = mapEdgesToNodes( allRangedWeapons )
    const featuredArmor = mapEdgesToNodes( allArmor )
    const featuredArtifacts = mapEdgesToNodes( allArtifacts )

    // Generate dynamic image thumbnail sizing relative to viewport
    const imageWidthSizes = useBreakpointValue( {
        base: 220,
        sm: 172,
        md: 110,
        lg: 130
    } )

    return (
        <Layout>
            <Seo omitSuffix={true} />
            <Container maxWidth='6xl' py={12}>
                <SimpleGrid columns={[1, 2]} spacing={8} my={12}>
                    <Stack direction='column' spacing={4}>
                        <Link
                            to='/melee-weapons/'
                            width='max'
                            transition='all 0.3s ease-in-out'
                            _hover={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}>
                            <Heading as='h2' fontSize='xl'>
                                Melee Weapons
                            </Heading>
                        </Link>
                        {featuredMeleeWeapons && (
                            <SimpleGrid columns={[2, null, 4]} spacing={2}>
                                {featuredMeleeWeapons.map( ( { node } ) => {
                                    return (
                                        <LinkBox>
                                            <Stack
                                                direction='column'
                                                spacing={2}>
                                                <Image
                                                    padding={2}
                                                    loading='eager'
                                                    imageData={node.image}
                                                    alt={node.title}
                                                    width={imageWidthSizes}
                                                    bgGradient={
                                                        node.isUnique
                                                            ? 'linear(to-tr, orange.500, orange.300)'
                                                            : 'linear(to-tr, gray.600, green.700)'
                                                    }
                                                    borderRadius={2} />
                                                <LinkOverlay
                                                    as={Link}
                                                    to={`/${generateSlug(
                                                        node.type
                                                    )}/${node.slug.current}/`}
                                                    _hover={{
                                                        textDecoration: 'none'
                                                    }}>
                                                    <Heading
                                                        as='h3'
                                                        fontSize={[
                                                            'xs',
                                                            'sm',
                                                            'md'
                                                        ]}
                                                        noOfLines={2}
                                                        pt={2}
                                                        pb={4}>
                                                        {node.title}
                                                    </Heading>
                                                </LinkOverlay>
                                            </Stack>
                                        </LinkBox>
                                    )
                                } )}
                            </SimpleGrid>
                        )}
                    </Stack>
                    <Stack direction='column' spacing={4}>
                        <Link
                            to='/ranged-weapons/'
                            transition='all 0.3s ease-in-out'
                            _hover={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}>
                            <Heading as='h2' fontSize='xl'>
                                Ranged Weapons
                            </Heading>
                        </Link>
                        {featuredRangedWeapons && (
                            <SimpleGrid columns={[2, null, 4]} spacing={2}>
                                {featuredRangedWeapons.map( ( { node } ) => {
                                    return (
                                        <LinkBox>
                                            <Stack
                                                direction='column'
                                                spacing={2}>
                                                <Image
                                                    padding={2}
                                                    loading='eager'
                                                    imageData={node.image}
                                                    alt={node.title}
                                                    width={imageWidthSizes}
                                                    bgGradient={
                                                        node.isUnique
                                                            ? 'linear(to-tr, orange.500, orange.300)'
                                                            : 'linear(to-tr, gray.600, green.700)'
                                                    }
                                                    borderRadius={2} />
                                                <LinkOverlay
                                                    as={Link}
                                                    to={`/${generateSlug(
                                                        node.type
                                                    )}/${node.slug.current}/`}
                                                    _hover={{
                                                        textDecoration: 'none'
                                                    }}>
                                                    <Heading
                                                        as='h3'
                                                        fontSize={[
                                                            'xs',
                                                            'sm',
                                                            'md'
                                                        ]}
                                                        noOfLines={2}
                                                        pt={2}
                                                        pb={4}>
                                                        {node.title}
                                                    </Heading>
                                                </LinkOverlay>
                                            </Stack>
                                        </LinkBox>
                                    )
                                } )}
                            </SimpleGrid>
                        )}
                    </Stack>
                    <Stack direction='column' spacing={4}>
                        <Link
                            to='/armor/'
                            transition='all 0.3s ease-in-out'
                            _hover={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}>
                            <Heading as='h2' fontSize='xl'>
                                Armor
                            </Heading>
                        </Link>
                        {featuredArmor && (
                            <SimpleGrid columns={[2, null, 4]} spacing={2}>
                                {featuredArmor.map( ( { node } ) => {
                                    return (
                                        <LinkBox>
                                            <Stack
                                                direction='column'
                                                spacing={2}>
                                                <Image
                                                    padding={2}
                                                    loading='eager'
                                                    imageData={node.image}
                                                    alt={node.title}
                                                    width={imageWidthSizes}
                                                    bgGradient={
                                                        node.isUnique
                                                            ? 'linear(to-tr, orange.500, orange.300)'
                                                            : 'linear(to-tr, gray.600, green.700)'
                                                    }
                                                    borderRadius={2} />
                                                <LinkOverlay
                                                    as={Link}
                                                    to={`/${generateSlug(
                                                        node.type
                                                    )}/${node.slug.current}/`}
                                                    _hover={{
                                                        textDecoration: 'none'
                                                    }}>
                                                    <Heading
                                                        as='h3'
                                                        fontSize={[
                                                            'xs',
                                                            'sm',
                                                            'md'
                                                        ]}
                                                        noOfLines={2}
                                                        pt={2}
                                                        pb={4}>
                                                        {node.title}
                                                    </Heading>
                                                </LinkOverlay>
                                            </Stack>
                                        </LinkBox>
                                    )
                                } )}
                            </SimpleGrid>
                        )}
                    </Stack>
                    <Stack direction='column' spacing={4}>
                        <Link
                            to='/artifacts/'
                            transition='all 0.3s ease-in-out'
                            _hover={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}>
                            <Heading as='h2' fontSize='xl'>
                                Artifacts
                            </Heading>
                        </Link>
                        {featuredArtifacts && (
                            <SimpleGrid columns={[2, null, 4]} spacing={2}>
                                {featuredArtifacts.map( ( { node } ) => {
                                    return (
                                        <LinkBox>
                                            <Stack
                                                direction='column'
                                                spacing={2}>
                                                <Image
                                                    padding={2}
                                                    loading='eager'
                                                    imageData={node.image}
                                                    alt={node.title}
                                                    width={imageWidthSizes}
                                                    bgGradient={
                                                        node.isUnique
                                                            ? 'linear(to-tr, orange.500, orange.300)'
                                                            : 'linear(to-tr, gray.600, green.700)'
                                                    }
                                                    borderRadius={2} />
                                                <LinkOverlay
                                                    as={Link}
                                                    to={`/${generateSlug(
                                                        node.type
                                                    )}/${node.slug.current}/`}
                                                    _hover={{
                                                        textDecoration: 'none'
                                                    }}>
                                                    <Heading
                                                        as='h3'
                                                        fontSize={[
                                                            'xs',
                                                            'sm',
                                                            'md'
                                                        ]}
                                                        noOfLines={2}
                                                        pt={2}
                                                        pb={4}>
                                                        {node.title}
                                                    </Heading>
                                                </LinkOverlay>
                                            </Stack>
                                        </LinkBox>
                                    )
                                } )}
                            </SimpleGrid>
                        )}
                    </Stack>
                </SimpleGrid>
            </Container>
        </Layout>
    )
}

export default Index
