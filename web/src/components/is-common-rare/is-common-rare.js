/**
 * MC Dungeons Loot Hunter Is common/rare item
 */
import { Box, SimpleGrid, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { generateSlug, mapEdgesToNodes } from '../../utils/helpers'
import Image from '../image/image'
import Link from '../link/link'

const IsCommonRare = ({ title = '', type = '', uniqueVariants = {} }) => {
    const uniques = mapEdgesToNodes(uniqueVariants)
    console.log(
        '🦄 ~ file: is-common-rare.js ~ line 11 ~ IsCommonRare ~ uniques',
        uniques
    )

    return (
        <Box>
            <Text mb={2}>
                The {title} has {uniques.length} unique{' '}
                {uniques.length === 1 ? 'variant' : 'variants'}
            </Text>
            <SimpleGrid columns={4} spacing={2}>
                {uniques.map(({ node }) => {
                    const url = `/${generateSlug(type)}/${node.slug.current}/`
                    return (
                        <Tooltip
                            key={node.id}
                            label={node.title}
                            placement='top'
                            colorScheme='purple'
                            shouldWrapChildren>
                            <Link to={url}>
                                <Image
                                    imageData={node.image}
                                    width={60}
                                    bgGradient='linear(to-tr, orange.500, orange.300)'
                                    borderRadius={2}
                                />
                            </Link>
                        </Tooltip>
                    )
                })}
            </SimpleGrid>
        </Box>
    )
}

export default IsCommonRare
