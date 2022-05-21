/**
 * Dungeons Loot Hunter Resolve Preview URLS
 */
import slugify from 'slugify'

export const resolvePreviewUrl = (document) => {
    // Set baseUrl from env config & values
    const baseUrl =
        process.env.SANITY_STUDIO_USE_LOCAL_PREVIEW === 'true'
            ? process.env.SANITY_STUDIO_GATSBY_LOCAL_PREVIEW_URL
            : process.env.SANITY_STUDIO_GATSBY_CLOUD_PREVIEW_URL

    switch (document._type) {
        case 'meleeWeapons':
        case 'rangedWeapons':
        case 'armor':
        case 'artifacts':
        case 'ancientMobs':
            // Convert type from camel case to kebab case
            const documentTypeSlug = slugify(
                document._type.replace(/[A-Z]/g, '-$&'),
                {
                    replacement: '-', // replace spaces with replacement character, defaults to `-`
                    lower: true, // convert to lower case, defaults to `false`
                    trim: true // trim leading and trailing replacement chars, defaults to `true`
                }
            )

            return `${baseUrl}${documentTypeSlug}/${document.slug.current}/`
        default:
            return baseUrl
    }
}
