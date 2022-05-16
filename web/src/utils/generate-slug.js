/**
 * Dungeons Loot Hunter generate slug
 */
import slugify from 'slugify'

const generateSlug = ( string ='' ) => {
    return slugify(string.replace(/[A-Z]/g, '-$&'), {
        lower: true
    })
}

export default generateSlug