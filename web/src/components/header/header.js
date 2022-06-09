/**
 * MC Dungeons Loot Hunter Header
 */
import { Center, Container, Flex, Heading, Stack, Tag, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import Link from '../link/link'
import NavToggleButton from '../nav-toggle-button/nav-toggle-button'
import SearchButton from '../search-button/search-button'

const Header = () => {
    const { title = '' } = useSiteMetadata()

    return (
        <Flex
            as='header'
            position='sticky'
            zIndex='docked'
            backgroundColor={useColorModeValue( 'white', 'gray.800' )}
            top={0}>
            <Container maxWidth='6xl'>
                <Flex
                    alignItems='center'
                    justifyContent='space-between'
                    paddingY={[3, 6]}>
                    <NavToggleButton />
                    <Stack direction='column' spacing={2}>
                        <Link
                            to='/'
                            aria-label='Home'
                            _hover={{ textDecoration: 'none' }}>
                            <Heading 
                                as='h1' 
                                textAlign='center'
                                fontSize={['md', 'xl', '2xl', '3xl', '4xl']}
                                maxWidth={['2xs', 'xs', 'sm', 'lg', 'xl']}>
                                {title}
                            </Heading>
                        </Link>
                        <Center>
                            <Tag size='sm' variant='subtle' width='max' colorScheme='brand_primary'>Beta</Tag>
                        </Center>
                    </Stack>
                    <SearchButton />
                </Flex>
            </Container>
        </Flex>
    )
}

export default Header
