import { pathsMap, types, typesMap } from '@/assets/data/types'
import { map } from 'rxjs'
import { DocumentLocationResolver } from 'sanity/presentation'

// Pass 'context' as the second argument
export const locate: DocumentLocationResolver = (params, context) => {
    // Ensure the type is valid
    if (!types.includes(params.type)) {
        return null
    }

    const doc$ = context.documentStore.listenQuery(
        `*[_id == $id][0]{slug,title}`,
        params,
        { perspective: 'previewDrafts' }
    )

    // Get doc type slug prefix
    const docTypeSlug = pathsMap[params.type as keyof typeof pathsMap]

    return doc$.pipe(
        map((doc) => {
            if (!doc || !doc.slug?.current) {
                return null
            }
            return {
                // message: `Used in ${doc.length} documents`,
                // tone: 'caution',
                locations: [
                    {
                        title: doc.title || 'Untitled',
                        href: `/${docTypeSlug}/${doc.slug.current}/`
                    },
                    {
                        title: `All ${
                            typesMap[params.type as keyof typeof typesMap]
                        }`,
                        href: `/${docTypeSlug}/`
                    }
                ]
            }
        })
    )
}
