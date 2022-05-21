/**
 * MC Dungeons Loot Hunter Layout
 */
import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <Stack spacing={0} minHeight='100vh' direction='column'>
            <Flex flex='1' flexDirection='column'>
                {children}
            </Flex>
        </Stack>
    )
}

export default Layout
