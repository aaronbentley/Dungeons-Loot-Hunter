/**
 * MC Dungeons Loot Hunter Artifact Traits
 */

import { List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import TraitIcon from '../trait-icon/trait-icon'

const ArtifactTraits = ({ data = [] }) => {
    if (!data) {
        return null
    }

    return (
        <List spacing={2}>
            {data.map((trait) => {
                return (
                    <ListItem key={trait}>
                        <ListIcon as={TraitIcon} color='orange.500' />
                        {trait}
                    </ListItem>
                )
            })}
        </List>
    )
}

export default ArtifactTraits
