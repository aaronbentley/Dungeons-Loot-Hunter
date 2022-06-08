/**
 * MC Dungeons Loot Hunter Theme Toggle Button
 *
 */
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'

const ThemeToggleButton = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton
            width='max'
            aria-label='Toggle theme'
            icon={colorMode === 'dark' ? <SunIcon fontSize='2xl' /> : <MoonIcon fontSize='2xl' />}
            onClick={toggleColorMode}
            zIndex={1} />
    )
}

export default ThemeToggleButton
