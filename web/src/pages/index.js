/**
 * MC Dungeons Loot Hunter Index
 */
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
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
import React, { useEffect, useState } from 'react'
import {
    // Hits,
    InstantSearch,
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

        // Track when the value coming from the React state changes to synchronize it with InstantSearch.
        useEffect(() => {
            if (query !== value) {
                refine(value)
            }
        }, [query, value, refine])

        return (
            <FormControl display='flex' justifyContent='center'>
                <VisuallyHidden>
                    <FormLabel htmlFor='search'>Search</FormLabel>
                </VisuallyHidden>
                <Input
                    id='search'
                    type='search'
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        // refine(e.target.value)
                    }}
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

    const CustomHits = () => {
        const { hits } = useHits()

        return (
            <Container maxWidth='6xl' py={12} centerContent>
                {hits.length === 0 && (
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Oh noes</AlertTitle>
                        <AlertDescription>
                            No Loot found matching query
                        </AlertDescription>
                    </Alert>
                )}
                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
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
            </Container>
        )
    }

    return (
        <Layout>
            <Container maxWidth='6xl' py={12} centerContent>
                <Stack direction='column' spacing={12}>
                    <Heading as='h1' fontSize='6xl' textAlign='center'>
                        {title}
                    </Heading>
                    <Stack direction='column' spacing={6}>
                        <InstantSearch
                            searchClient={searchClient}
                            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
                            <CustomSearchBox />
                            <CustomHits />
                        </InstantSearch>
                    </Stack>
                </Stack>
            </Container>
        </Layout>
    )
}

export default Index
