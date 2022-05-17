/**
 * Dungeons Loot Hunter generate slug
 */
import slugify from 'slugify'

export const mapEdgesToNodes = ( data = [] ) => {
   if ( !data.edges ) {
       return []
   }
   return data.edges.map( ( node ) => node )
}

export const generateSlug = ( string ='' ) => {
    return slugify(string.replace(/[A-Z]/g, '-$&'), {
        lower: true
    })
}

export const humanReadableTypeName = ( string = '' ) => {
    const words = string.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(" ");
}

export const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
}