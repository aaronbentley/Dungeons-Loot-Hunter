/**
 * MC Dungeons Loot Hunter Alogolia Search Hits
 */
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Container,
    Grid,
    GridItem,
    Heading,
    LinkBox,
    LinkOverlay,
    Stack,
    useBreakpointValue
} from '@chakra-ui/react'
import React from 'react'
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web'
import Image from '../image/image'
import Link from '../link/link'

const Hits = ( props ) => {
    const { hits } = useHits( props )
    const { query } = useSearchBox()

    // Generate dynamic image thumbnail sizing relative to viewport
    const imageWidthSizes = useBreakpointValue( {
        base: 133,
        sm: 228,
        md: 304,
        lg: 205
    } )

    // // If no query, bail early
    if ( !query ) {
        return null
    }

    return (
        <Container maxWidth='6xl' centerContent px={0}>
            {query && hits.length === 0 && (
                <Alert status='warning' variant='left-accent'>
                    <AlertIcon />
                    <AlertTitle>This ain't it Chief</AlertTitle>
                    <AlertDescription>
                        No Loot found matching query
                    </AlertDescription>
                </Alert>
            )}
            <Grid
                templateColumns={[
                    'repeat(3, 1fr)',
                    null,
                    null,
                    'repeat(5, 1fr)'
                ]}
                gap={6}>
                {hits &&
                    hits.map( ( hit ) => {
                        return (
                            <GridItem key={hit.objectID}>
                                <LinkBox>
                                    <Stack direction='column' spacing={2}>
                                        <Image
                                            padding={2}
                                            imageData={hit.imageData}
                                            alt={hit.title}
                                            width={imageWidthSizes}
                                            bgGradient={
                                                hit.unique
                                                    ? 'linear(to-tr, orange.500, orange.300)'
                                                    : 'linear(to-tr, gray.600, green.700)'
                                            }
                                            borderRadius={2} />
                                        <LinkOverlay
                                            as={Link}
                                            to={hit.url}
                                            _hover={{
                                                textDecoration: 'none'
                                            }}>
                                            <Heading
                                                as='h4'
                                                fontSize={['xs', 'lg']}
                                                noOfLines={2}
                                                pt={2}
                                                pb={4}>
                                                {hit.title}
                                            </Heading>
                                        </LinkOverlay>
                                    </Stack>
                                </LinkBox>
                            </GridItem>
                        )
                    } )}
            </Grid>
        </Container>
    )
}

export default Hits
