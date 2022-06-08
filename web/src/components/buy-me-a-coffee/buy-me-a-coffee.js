/**
 * MC Dungeons Loot Hunter Buy Me A Coffee
 */
import { Button } from '@chakra-ui/react'
import React from 'react'
import Link from '../link/link'
import BuyMeACoffeeIcon from './buy-me-a-coffee-icon'

const BuyMeACoffee = () => (
    <React.Fragment>
        {/*
        <Script
            type='text/javascript'
            src='https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js'
            data-name='bmc-button'
            data-slug='aaronbentley'
            data-color='#FFDD00'
            data-emoji=''
            data-font='Poppins'
            data-text='Buy me a coffee'
            data-outline-color='#000000'
            data-font-color='#000000'
            data-coffee-color='#ffffff'
        />
        */}
        <Button
            colorScheme='yellow'
            as={Link}
            to='https://www.buymeacoffee.com/aaronbentley'
            target='_blank'
            width='max'
            leftIcon={<BuyMeACoffeeIcon boxSize={6} />}
            iconSpacing={2}>
            Buy me a coffee
        </Button>
    </React.Fragment>
)

export default BuyMeACoffee
