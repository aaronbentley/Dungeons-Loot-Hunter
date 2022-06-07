/* eslint-disable no-unused-vars */
/**
 * MC Dungeons Loot Hunter CookieConsent
 */

import { Button, ButtonGroup, Flex, Portal, Slide, Text, useColorModeValue } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import React from 'react'
import { useCookie, useLocalStorage } from 'react-use'
import Emoji from '../emoji/emoji'

const CookieConsent = () => {
    // Check in browser enviroment - Initialize & configure tracking
    const location = useLocation()
    if ( typeof window !== 'undefined' ) {
        initializeAndTrack( location )
    }
    
    // Save banner visible state to localstorage
    const [ 
        cookieConsentLocalStorageValue, 
        setCookieConsentLocalStorageValue 
    ] = useLocalStorage( 'cookie-consent-hidden', false )

    // Create cookies
    const [ gaCookie, updateGaCookie ] = useCookie( 'gatsby-gdpr-google-analytics' )
    const [ gtmCookie, updateGtmCookie ] = useCookie( 'gatsby-gdpr-google-tagmanager' )

    // Enable tracking services
    const EnableAnalytics = () => {
        updateGaCookie( true )
        updateGtmCookie( true )

        // Update banner visible state
        setCookieConsentLocalStorageValue( true )
    }

    const backgroundColor = useColorModeValue( 'white', 'gray.800' )

    return (
        <Portal>
            {!cookieConsentLocalStorageValue && (
                <Slide 
                    in={!cookieConsentLocalStorageValue} 
                    direction='bottom'>
                    <Flex
                        py={6}
                        backgroundColor={backgroundColor}
                        mb={2}
                        justifyContent='center'
                        alignItems='center'
                        maxWidth='xl'
                        borderRadius='md'
                        mx='auto'>
                        <Emoji symbol='🍪' label='cookie' mr={4} />
                        <Text as='span'>Ok to use cookies?</Text>
                        <ButtonGroup 
                            size='sm' 
                            spacing={2}  
                            ml={4} >
                            <Button 
                                colorScheme='brand_primary'
                                variant='solid' 
                                onClick={EnableAnalytics}>
                                    Oki doki
                            </Button>
                            <Button 
                                colorScheme='brand_primary'
                                variant='outline'
                                onClick={() => setCookieConsentLocalStorageValue( true )}>
                                    No thanks
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </Slide>
            )}
        </Portal>
    )
}

export default CookieConsent
