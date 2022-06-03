/**
 * MC Dungeons Loot Hunter Header
 */
import { Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import Link from '../link/link'
import NavToggleButton from '../nav-toggle-button/nav-toggle-button'
import ThemeToggleButton from '../theme-toggle-button/theme-toggle-button'

const Header = () => {
    const { title = '' } = useSiteMetadata()

    return (
        <Flex
            as='header'
            position='sticky'
            zIndex='docked'
            top={0}
            backgroundColor={useColorModeValue( 'white', 'gray.800' )}>
            <Container maxWidth='6xl'>
                <Flex
                    alignItems='center'
                    justifyContent='space-between'
                    paddingY={[3, 6]}>
                    <NavToggleButton />
                    <Link
                        to='/'
                        aria-label='Home'
                        _hover={{ textDecoration: 'none' }}>
                        <Heading as='h1' size={['md', 'lg', 'xl']}>
                            {title}
                        </Heading>
                    </Link>
                    <ThemeToggleButton />
                </Flex>
            </Container>
        </Flex>
    )
}

export default Header
