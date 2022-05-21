/**
 * MC Dungeons Loot Hunter Metadata Hook
 *
 */
import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
    const { site = {} } = useStaticQuery(
        graphql`
            query SITE_METADATA {
                site {
                    siteMetadata {
                        siteUrl
                        title
                        author
                    }
                }
            }
        `
    )

    return site.siteMetadata
}
