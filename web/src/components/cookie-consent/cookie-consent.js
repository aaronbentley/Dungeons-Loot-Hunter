/* eslint-disable no-unused-vars */
/**
 * MC Dungeons Loot Hunter CookieConsent
 *
 */

import { Button, ButtonGroup, Flex, Portal, Slide, Text } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'
import React from 'react'
import { useCookie, useLocalStorage } from 'react-use'

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

    // Guard - bail early if in development environment
    if ( process.env.GATSBY_ACTIVE_ENV === 'development' ) {
        return null
    }

    return (
        <Portal>
            {!cookieConsentLocalStorageValue && (
                <Slide 
                    in={!cookieConsentLocalStorageValue} 
                    direction='bottom'>
                    <Flex
                        py={4}
                        color='white'
                        bg='gray.900'
                        mb={2}
                        justifyContent='center'
                        alignItems='center'
                        maxWidth='2xl'
                        borderRadius='md'
                        mx='auto'>
                        <Text as='span' mr={4}>🍪</Text>
                        <Text as='span'>We use cookies to optimise this service</Text>
                        <ButtonGroup 
                            size='sm' 
                            spacing={2}  
                            ml={4} >
                            <Button 
                                backgroundColor='brand_primary.400'
                                variant='solid' 
                                _hover={{
                                    backgroundColor: 'brand_primary.600'
                                }}
                                onClick={EnableAnalytics}>
                                    Accept
                            </Button>
                            <Button 
                                color='brand_primary.400'
                                borderColor='brand_primary.400'
                                variant='outline'
                                _hover={{
                                    color: 'brand_primary.600',
                                    borderColor: 'brand_primary.600'
                                }}
                                onClick={() => setCookieConsentLocalStorageValue( true )}>
                                    Reject
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </Slide>
            )}
        </Portal>
    )
}

export default CookieConsent
