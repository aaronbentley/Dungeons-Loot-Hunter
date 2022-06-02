/**
 * MC Dungeons Loot Hunter Alogolia Search
 */

import { Spinner } from '@chakra-ui/react'
import algoliasearch from 'algoliasearch/lite'
import React, { lazy, Suspense } from 'react'
import { InstantSearch, useConfigure } from 'react-instantsearch-hooks-web'

const SearchBox = lazy( () => import( './search-box' ) )
const Hits = lazy( () => import( './hits' ) )

const CustomConfigure = ( props ) => {
    useConfigure( {
        hitsPerPage: 20,
        analytics: true
    } )

    return null
}

const Search = () => {
    // Algolia config
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )


    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
            <CustomConfigure />
            <Suspense fallback={<Spinner />}>
                <SearchBox />
                <Hits />
            </Suspense>
        </InstantSearch>
    )
}

export default Search
