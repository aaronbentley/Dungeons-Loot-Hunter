/**
 * MC Dungeons Loot Hunter Alogolia Search
 */

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from '@chakra-ui/react'
import algoliasearch from 'algoliasearch/lite'
import React, { lazy, Suspense } from 'react'
import { InstantSearch, useConfigure } from 'react-instantsearch-hooks-web'

const SearchBox = lazy( () => import( './search-box' ) )
const Hits = lazy( () => import( './hits' ) )

const CustomConfigure = ( props ) => {
    useConfigure( {
        hitsPerPage: 15,
        analytics: true
    } )

    return null
}

const Search = ( { isOpen, onClose } ) => {
    // Algolia config
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size={'full'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign='center'>Search</ModalHeader>
                <ModalCloseButton />
                <ModalBody py={12}>
                    <InstantSearch
                        searchClient={searchClient}
                        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
                        <CustomConfigure />
                        <Suspense fallback={<Spinner />}>
                            <SearchBox mb={12} />
                            <Hits />
                        </Suspense>
                    </InstantSearch>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Search
