/**
 * Common media fragments
 */
export const imageAssetReference = `
    image {
        ...,
        asset-> {
            ...,
            metadata
        }
    }
`

export const slug = `
    slug {
        current
    }
`
