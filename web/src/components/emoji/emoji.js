/**
 * MC Dungeons Loot Hunter Emoji
 */
import { chakra } from '@chakra-ui/react'
import A11yEmoji from 'a11y-react-emoji'
import React from 'react'

const Emoji = ( { symbol = '♥️', label= '', ...rest} ) => {

    const ChakraA11yEmoji = chakra( A11yEmoji, {
        // Forward GPSI props to Emoji component
        shouldForwardProp: ( prop ) => {
            return [
                'symbol',
                'label'
            ].includes( prop )
        }
    } )

    return (
        <ChakraA11yEmoji
            symbol={symbol}
            label={label}
            {...rest} />
    )
}


export default Emoji