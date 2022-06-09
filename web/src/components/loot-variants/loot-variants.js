/**
 * MC Dungeons Loot Hunter Loot Variants
 */
import { SimpleGrid, Stack, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { generateSlug, mapEdgesToNodes } from '../../utils/helpers'
import Image from '../image/image'
import Link from '../link/link'

const LootVariants = ( {
    title,
    type,
    isUnique,
    variationOf,
    uniqueVariants
} ) => {
    if ( isUnique ) {
        const url = `/${generateSlug( type )}/${variationOf.slug.current}/`
        return (
            <Stack direction='column' spacing={4}>
                <Text>
                    {title} is a unique variant of the{' '}
                    <Link to={url} fontWeight='700'>
                        {variationOf.title}
                    </Link>
                </Text>
                <SimpleGrid columns={4} spacing={2}>
                    <Tooltip
                        key={variationOf.id}
                        label={variationOf.title}
                        placement='top'
                        shouldWrapChildren>
                        <Link to={url} title={variationOf.title}>
                            <Image
                                imageData={variationOf.image}
                                alt={variationOf.title}
                                loading='eager'
                                width={60}
                                bgGradient='linear(to-tr, gray.600, green.700)'
                                borderRadius={2}
                                padding={2} />
                        </Link>
                    </Tooltip>
                </SimpleGrid>
            </Stack>
        )
    }

    const uniques = mapEdgesToNodes( uniqueVariants )

    // If no unique variants, bail early
    if ( !uniques.length ) {
        return null
    }

    return (
        <Stack direction='column' spacing={4}>
            <Text>
                {title} has {uniques.length} unique{' '}
                {uniques.length === 1 ? 'variant' : 'variants'}
            </Text>
            <SimpleGrid columns={4} spacing={2}>
                {uniques.map( ( { node } ) => {
                    const url = `/${generateSlug( type )}/${node.slug.current}/`
                    return (
                        <Tooltip
                            key={node.id}
                            label={node.title}
                            placement='top'
                            shouldWrapChildren>
                            <Link to={url} title={node.title}>
                                <Image
                                    imageData={node.image}
                                    alt={node.title}
                                    loading='eager'
                                    width={60}
                                    bgGradient='linear(to-tr, orange.500, orange.300)'
                                    borderRadius={2}
                                    padding={2} />
                            </Link>
                        </Tooltip>
                    )
                } )}
            </SimpleGrid>
        </Stack>
    )
}

export default LootVariants
