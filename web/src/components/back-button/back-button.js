/**
 * MC Dungeons Loot Hunter Back Button
 */
import { Button } from '@chakra-ui/react'
import { navigate } from 'gatsby'
import React from 'react'

const BackButton = () => (
    <Button onClick={() => navigate(-1)} width='max' variant='solid' size='xs'>
        Back
    </Button>
)

export default BackButton
