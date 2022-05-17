/**
 * Dungeons Loot Hunter Index
 */
import {
    Container,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    Input,
    LinkBox,
    LinkOverlay,
    Stack,
    VisuallyHidden
} from '@chakra-ui/react'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Image from '../components/image/image'
import { Layout } from '../components/layouts'
import Link from '../components/link/link'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { generateSlug, mapEdgesToNodes } from '../utils/helpers'

export const query = graphql`
    query INDEX_PAGE {
        allSanityMeleeWeapons {
            edges {
                node {
                    _type
                    id
                    title
                    slug {
                        current
                    }
                    image {
                        ...ImageWithPreview
                    }
                    isUnique
                }
            }
        }
        allSanityRangedWeapons {
            edges {
                node {
                    _type
                    id
                    title
                    slug {
                        current
                    }
                    image {
                        ...ImageWithPreview
                    }
                    isUnique
                }
            }
        }
        allSanityArmor {
            edges {
                node {
                    _type
                    id
                    title
                    slug {
                        current
                    }
                    image {
                        ...ImageWithPreview
                    }
                    isUnique
                }
            }
        }
        allSanityArtifacts {
            edges {
                node {
                    _type
                    id
                    title
                    slug {
                        current
                    }
                    image {
                        ...ImageWithPreview
                    }
                    isUnique
                }
            }
        }
    }
`

const Index = ({ data = {} }) => {
    // console.log('🦄 ~ file: index.js ~ line 85 ~ Index ~ data', { data })
    const { title = '' } = useSiteMetadata()

    const {
        allSanityMeleeWeapons = [],
        allSanityRangedWeapons = [],
        allSanityArmor = [],
        allSanityArtifacts = []
    } = data

    // Merge items into collection & map edges to nodes
    const collection = [
        ...mapEdgesToNodes(allSanityMeleeWeapons),
        ...mapEdgesToNodes(allSanityRangedWeapons),
        ...mapEdgesToNodes(allSanityArmor),
        ...mapEdgesToNodes(allSanityArtifacts)
    ]

    // Handle input state
    const [searchValue, setSearchValue] = useState('')

    // Handle items matching search
    const [items, setItems] = useState([])

    // Search items
    useEffect(() => {
        if (searchValue !== '' && searchValue.length >= 2) {
            const matches = collection.filter(({ node }) => {
                if (
                    node.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                    return node
                }
                return null
            })

            setItems(matches)
        }

        return () => {
            setItems([])
        }
    }, [searchValue])

    return (
        <Layout>
            <Container maxWidth='6xl' py={12} centerContent>
                <Stack direction='column' spacing={12}>
                    <Heading as='h1' fontSize='6xl'>
                        {title}
                    </Heading>
                    <FormControl display='flex' justifyContent='center'>
                        <VisuallyHidden>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                        </VisuallyHidden>
                        <Input
                            id='search'
                            type='search'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder='What loot are you looking for?'
                            size='lg'
                            variant='filled'
                            focusBorderColor='purple.400'
                            textAlign='center'
                            maxWidth='xl'
                        />
                    </FormControl>
                </Stack>
            </Container>
            <Container maxWidth='full'>
                <Grid templateColumns='repeat(6, 1fr)' gap={6}>
                    {items &&
                        items.map(({ node }) => {
                            return (
                                <GridItem key={node.id}>
                                    <LinkBox>
                                        <Stack direction='column' spacing={2}>
                                            <Image
                                                imageData={node.image}
                                                alt={node.title}
                                                width={280}
                                                bgGradient={
                                                    node.isUnique
                                                        ? 'linear(to-tr, orange.500, orange.300)'
                                                        : 'linear(to-tr, gray.600, green.700)'
                                                }
                                                borderRadius={2}
                                            />
                                            <LinkOverlay
                                                as={Link}
                                                to={`/${generateSlug(
                                                    node._type
                                                )}/${node.slug.current}/`}
                                                _hover={{
                                                    textDecoration: 'none'
                                                }}>
                                                <Heading
                                                    as='h4'
                                                    fontSize='lg'
                                                    // textAlign='center'
                                                    noOfLines={1}
                                                    pt={2}
                                                    pb={4}>
                                                    {node.title}
                                                </Heading>
                                            </LinkOverlay>
                                        </Stack>
                                    </LinkBox>
                                </GridItem>
                            )
                        })}
                </Grid>
            </Container>
        </Layout>
    )
}

export default Index
