/**
 * MC Dungeons Loot Hunter - Theme Style Factory
 */

import { extendTheme } from '@chakra-ui/react'
import colors from './colors'

const theme = extendTheme({
    ...colors,
    config: {
        initialColorMode: 'dark'
    }
})

export default theme
