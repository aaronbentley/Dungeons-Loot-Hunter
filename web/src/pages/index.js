/**
 * MC Dungeons Loot Hunter Index
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
import algoliasearch from 'algoliasearch/lite'
import React, { useEffect, useRef, useState } from 'react'
import {
    Hits,
    InstantSearch,
    SearchBox,
    useHits,
    useSearchBox
} from 'react-instantsearch-hooks-web'
import Image from '../components/image/image'
import { Layout } from '../components/layouts'
import Link from '../components/link/link'
import { useSiteMetadata } from '../hooks/use-site-metadata'

// export const query = graphql`
//     query INDEX_PAGE {
//     }
// `

const Index = ({ data = {} }) => {
    // console.log('🦄 ~ file: index.js ~ line 85 ~ Index ~ data', { data })
    const { title = '' } = useSiteMetadata()

    // Algolia config
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )

    const CustomSearchBox = (props) => {
        const { query, refine } = useSearchBox(props)
        const [value, setValue] = useState(query)
        const inputRef = useRef(null)

        // Track when the value coming from the React state changes to synchronize it with InstantSearch.
        useEffect(() => {
            if (query !== value) {
                refine(value)
            }
        }, [value, refine])

        // Track when the InstantSearch query changes to synchronize it with the React state.
        // useEffect(() => {
        //     // We bypass the state update if the input is focused to avoid concurrent updates when typing.
        //     if (!inputRef.current?.isFocused() && query !== value) {
        //         setValue(query)
        //     }
        // }, [query])

        return (
            <FormControl display='flex' justifyContent='center'>
                <VisuallyHidden>
                    <FormLabel htmlFor='search'>Search</FormLabel>
                </VisuallyHidden>
                <Input
                    ref={inputRef}
                    id='search'
                    type='search'
                    value={value}
                    onChange={setValue}
                    placeholder='What loot are you looking for?'
                    size='lg'
                    variant='filled'
                    focusBorderColor='purple.400'
                    textAlign='center'
                    maxWidth='xl'
                    {...props}
                />
            </FormControl>
        )
    }

    const CustomHits = (props) => {
        const { hits, results, sendEvent } = useHits(props)

        return (
            <Grid templateColumns='repeat(6, 1fr)' gap={6}>
                {hits &&
                    hits.map((hit) => {
                        return (
                            <GridItem key={hit.objectID}>
                                <LinkBox>
                                    <Stack direction='column' spacing={2}>
                                        <Image
                                            imageData={hit.imageData}
                                            alt={hit.title}
                                            width={280}
                                            bgGradient={
                                                hit.isUnique
                                                    ? 'linear(to-tr, orange.500, orange.300)'
                                                    : 'linear(to-tr, gray.600, green.700)'
                                            }
                                            borderRadius={2}
                                        />
                                        <LinkOverlay
                                            as={Link}
                                            to={hit.url}
                                            _hover={{
                                                textDecoration: 'none'
                                            }}>
                                            <Heading
                                                as='h4'
                                                fontSize='lg'
                                                noOfLines={1}
                                                pt={2}
                                                pb={4}>
                                                {hit.title}
                                            </Heading>
                                        </LinkOverlay>
                                    </Stack>
                                </LinkBox>
                            </GridItem>
                        )
                    })}
            </Grid>
        )
    }

    const Hit = ({ hit }) => {
        return <Link to={hit.url}>{hit.title}</Link>
    }

    return (
        <Layout>
            <Container maxWidth='6xl' py={12} centerContent>
                <Stack direction='column' spacing={12}>
                    <Heading as='h1' fontSize='6xl'>
                        {title}
                    </Heading>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
                        <SearchBox />
                        {/* <CustomSearchBox /> */}
                        <Hits />
                        {/* <Hits hitComponent={Hit} /> */}
                        {/* <CustomHits />  */}
                    </InstantSearch>
                    {/*
                        <FormControl display='flex' justifyContent='center'>
                            <VisuallyHidden>
                                <FormLabel htmlFor='search'>Search</FormLabel>
                            </VisuallyHidden>
                            <Input
                                id='search'
                                type='search'
                                // value={searchValue}
                                // onChange={(e) => setSearchValue(e.target.value)}
                                placeholder='What loot are you looking for?'
                                size='lg'
                                variant='filled'
                                focusBorderColor='purple.400'
                                textAlign='center'
                                maxWidth='xl'
                            />
                        </FormControl>
                    */}
                </Stack>
            </Container>
            {/*
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
            */}
        </Layout>
    )
}

export default Index
