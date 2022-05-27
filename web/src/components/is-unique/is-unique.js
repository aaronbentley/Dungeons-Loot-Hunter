/**
 * MC Dungeons Loot Hunter Is unique item
 */
import { Text } from '@chakra-ui/react'
import React from 'react'
import { generateSlug } from '../../utils/helpers'
import Link from '../link/link'

const IsUnique = ({
    title = '',
    type = '',
    isUnique = false,
    variationOf = {}
}) => {
    if (!isUnique || !variationOf) {
        return null
    }

    if (isUnique) {
        const url = `/${generateSlug(type)}/${variationOf.slug.current}/`
        return (
            <Text>
                The {title} is a unique variant of the{' '}
                <Link to={url} fontWeight='700'>
                    {variationOf.title}
                </Link>
            </Text>
        )
    }
}

export default IsUnique
