/**
 * MC Dungeons Loot Hunter Layout
 */
import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import Header from '../header/header'

const Layout = ({ children }) => {
    return (
        <Stack spacing={0} minHeight='100vh' direction='column'>
            <Header />
            <Flex flex='1' flexDirection='column'>
                {children}
            </Flex>
        </Stack>
    )
}

export default Layout
