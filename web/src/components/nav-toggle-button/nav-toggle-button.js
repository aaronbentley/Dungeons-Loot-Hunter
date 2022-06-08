/**
 * MC Dungeons Loot Hunter Nav Toggle Button
 *
 */
import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import NavMenu from '../nav-menu/nav-menu'
 
const NavToggleButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
 
    return (
        <React.Fragment>
            <IconButton
                aria-label='Navigation menu'
                icon={<HamburgerIcon fontSize='2xl' />}
                onClick={onOpen}
                zIndex={1} />
            <NavMenu isOpen={isOpen} onClose={onClose} />
        </React.Fragment>
    )
}
 
export default NavToggleButton