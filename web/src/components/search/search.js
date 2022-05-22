/**
 * MC Dungeons Loot Hunter Alogolia Search
 */

import algoliasearch from 'algoliasearch/lite'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import Hits from './hits'
import SearchBox from './search-box'

const Search = (props) => {
    // Algolia config
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
            <SearchBox />
            <Hits />
        </InstantSearch>
    )
}

export default Search
