/**
 * MC Dungeons Loot Hunter Nav Menu
 *
 */
import { CloseIcon } from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    IconButton,
    Stack
} from '@chakra-ui/react'
import React, { useRef } from 'react'

const NavMenu = ({ isOpen, onClose }) => {
    // Create ref for close button
    const closeButton = useRef()

    return (
        <Drawer
            placement='left'
            initialFocusRef={closeButton}
            onClose={onClose}
            isOpen={isOpen}
            size='xs'
            zIndex='auto'>
            <DrawerOverlay />
            <DrawerContent
                // backgroundColor='purple.700'
                py={6}
                height='full'>
                <DrawerHeader
                    display='flex'
                    justifyContent='flex-end'
                    py={0}
                    px={4}>
                    <IconButton
                    size='xs'
                        ref={closeButton}
                        aria-label='Navigation menu'
                        icon={<CloseIcon />}
                        onClick={onClose}
                        zIndex={1}
                    />
                </DrawerHeader>
                <DrawerBody pt={12} overflowX='hidden'>
                    <Stack
                        height='full'
                        direction='row'
                        pl={[8, 0]}
                        justifyContent='space-between'
                        maxHeight='xl'>
                        <Flex direction='column' justifyContent='flex-start'>
                            <Heading>Nav</Heading>
                        </Flex>
                    </Stack>
                </DrawerBody>
                <DrawerFooter
                    pt={[8, 12, 24]}
                    justifyContent='flex-start'></DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default NavMenu
