/**
 * Dungeons Loot Hunter Ancient mobs
 */
 import { Stack, Tooltip } from '@chakra-ui/react'
import React from 'react'
import Image from '../image/image'
 
 const AncientMobs = ({ data = {} }) => {
     if (!data) {
         return null
     }
 
     // Check if standard (array) or unqiue (nested array)
     const ancientMobs = Array.isArray(data) ? data : data.droppedBy
 
     return (
         <Stack direction='row' spacing={2}>
             {ancientMobs && ancientMobs.map((mob) => (
                 <Tooltip
                     key={mob.id}
                     label={mob.title}
                     placement='top'
                     colorScheme='purple'
                     shouldWrapChildren>
                     <Image
                         imageData={mob.image}
                         alt={mob.title}
                         width={84}
                         height={84}
                     />
                 </Tooltip>
             ))}
         </Stack>
     )
 }
 
 export default AncientMobs
 