/**
 * MC Dungeons Loot Hunter Search Button
 *
 */
import { SearchIcon } from '@chakra-ui/icons'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import Search from '../search/search'
 
const SearchButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <React.Fragment>
            <IconButton
                aria-label='Search'
                icon={<SearchIcon fontSize='2xl' />}
                onClick={onOpen}
                zIndex={1} />
            <Search isOpen={isOpen} onClose={onClose} />
        </React.Fragment>
    )
}
 
export default SearchButton
 