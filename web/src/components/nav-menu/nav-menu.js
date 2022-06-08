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
    DrawerOverlay, IconButton,
    Stack
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import BuyMeACoffee from '../buy-me-a-coffee/buy-me-a-coffee'
import Link from '../link/link'
import ThemeToggleButton from '../theme-toggle-button/theme-toggle-button'

const NavMenu = ( { isOpen, onClose } ) => {
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
                        zIndex={1} />
                </DrawerHeader>
                <DrawerBody pt={12} overflowX='hidden'>
                    <Stack
                        mb={6}
                        direction='column'>
                        <Link
                            to='/melee-weapons/'
                            fontSize={['xl', '2xl']}
                            fontWeight='bold'
                            transition='all 0.3s ease-in-out'
                            _hover ={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}
                            onClick={onClose}>
                                Melee Weapons
                        </Link>
                        <Link
                            to='/ranged-weapons/'
                            fontSize={['xl', '2xl']}
                            fontWeight='bold'
                            transition='all 0.3s ease-in-out'
                            _hover ={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}
                            onClick={onClose}>
                                Ranged Weapons
                        </Link>
                        <Link
                            to='/armor/'
                            fontSize={['xl', '2xl']}
                            fontWeight='bold'
                            transition='all 0.3s ease-in-out'
                            _hover ={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}
                            onClick={onClose}>
                                Armor
                        </Link>
                        <Link
                            to='/artifacts/'
                            fontSize={['xl', '2xl']}
                            fontWeight='bold'
                            transition='all 0.3s ease-in-out'
                            _hover ={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}
                            onClick={onClose}>
                                Artifacts
                        </Link>
                        <Link
                            to='/ancient-mobs/'
                            fontSize={['xl', '2xl']}
                            fontWeight='bold'
                            transition='all 0.3s ease-in-out'
                            _hover ={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}
                            onClick={onClose}>
                                Ancient Mobs
                        </Link>
                        <Link
                            to='/levels/'
                            fontSize={['xl', '2xl']}
                            fontWeight='bold'
                            transition='all 0.3s ease-in-out'
                            _hover ={{
                                textDecoration: 'none',
                                color: 'brand_primary.400'
                            }}
                            onClick={onClose}>
                                Levels
                        </Link>
                    </Stack>
                    <BuyMeACoffee />
                </DrawerBody>
                <DrawerFooter
                    pt={[8, 12, 24]}
                    justifyContent='flex-start'>
                    <ThemeToggleButton />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default NavMenu
