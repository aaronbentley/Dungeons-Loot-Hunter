/**
 * MC Dungeons Loot Hunter Sanity Site Settings Hook
 */
import { graphql, useStaticQuery } from 'gatsby'

export const useSiteSettings = () => {
    const { siteSettings = {} } = useStaticQuery(
        graphql`
            query SITE_SETTINGS {
                siteSettings: sanitySiteSettings {
                    title
                    description
                    logo {
                        ...Image
                    }
                    primaryBrandColor: _rawPrimaryColor(
                        resolveReferences: { maxDepth: 10 }
                    )
                    secondaryBrandColor: _rawSecondaryColor(
                        resolveReferences: { maxDepth: 10 }
                    )
                }
            }
        `
    )

    return siteSettings
}
