/**
 * Dungeons Loot Hunter Armor Traits
 */

import { List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import TraitIcon from '../trait-icon/trait-icon'

const ArmorTraits = ({ data = [] }) => {
    if (!data) {
        return null
    }

    return (
        <List spacing={2}>
            {data.map((trait) => {
                return (
                    <ListItem key={trait}>
                        <ListIcon as={TraitIcon} color='gray.400' />
                        {trait}
                    </ListItem>
                )
            })}
        </List>
    )
}

export default ArmorTraits
