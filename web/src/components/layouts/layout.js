/**
 * MC Dungeons Loot Hunter Layout
 */
import { Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import CookieConsent from '../cookie-consent/cookie-consent'
import Footer from '../footer/footer'
import Header from '../header/header'

const Layout = ( { children } ) => {
    return (
        <React.Fragment>
            <Stack spacing={0} minHeight='100vh' direction='column'>
                <Header />
                <Flex flex='1' flexDirection='column'>
                    {children}
                </Flex>
                <Footer />
            </Stack>
            <CookieConsent />
        </React.Fragment>
    )
}

export default Layout
