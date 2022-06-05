/**
 * MC Dungeons Loot Hunter Footer
 */
import { Container, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import BuyMeACoffee from '../buy-me-a-coffee/buy-me-a-coffee'
import Link from '../link/link'

const Footer = () => {
    return (
        <Flex as='footer'>
            <Container maxWidth='6xl'>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    paddingY={[3, 6]}>
                    <Stack direction='column' spacing={4} justifyContent='center' alignItems='center'>
                        <BuyMeACoffee />
                        <Link
                            to='https://twitter.com/aaronbentley/'
                            aria-label='Home'
                            _hover={{ textDecoration: 'none' }}>
                                slinkypixels.io
                        </Link>
                    </Stack>
                </Flex>
            </Container>
        </Flex>
    )
}

export default Footer
