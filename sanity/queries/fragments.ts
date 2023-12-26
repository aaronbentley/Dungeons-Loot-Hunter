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
