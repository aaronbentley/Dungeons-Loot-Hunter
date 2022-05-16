/**
 * Dungeons Loot Hunter Is unique item
 */
import { Text } from '@chakra-ui/react'
import React from 'react'
import slugify from 'slugify'
import Link from '../link/link'
import generateSlug from '../../utils/generate-slug'

/**
 * TODO: create slug of {type} and build url to link to variation item
 */
const IsUnique = ({ title = '', type = '', isUnique = false, variationOf = {} }) => {

    if (!isUnique) {
        return null
    }

    const prefix = generateSlug( type )
    console.log('🦄 ~ file: is-unique.js ~ line 20 ~ IsUnique ~ prefix', prefix)
    const url = `/${prefix}/${variationOf.slug.current}/`

    return (
        <Text>
            {title} is a unique variant of the <Link to={url}>{variationOf.title}</Link>
        </Text>
    )
}

export default IsUnique
