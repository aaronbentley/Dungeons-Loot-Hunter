/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { colorInput } from '@sanity/color-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { structure } from './sanity/config/structure'
import { apiVersion, dataset, projectId, projectName } from './sanity/env'
import { schema } from './sanity/schema'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
    basePath: '/studio',
    title: projectName,
    projectId,
    dataset,
    plugins: [
        structureTool({
            structure
        }),
        presentationTool({
            // previewUrl
            // locate
            previewUrl: {
                draftMode: {
                    enable: '/api/draft'
                }
            }
        }),
        visionTool({ defaultApiVersion: apiVersion }),
        colorInput()
    ],
    schema: {
        ...schema,
        templates: (templates) =>
            templates.filter(
                ({ schemaType }) => !singletonTypes.has(schemaType)
            )
    },
    document: {
        // For singleton types, filter out actions that are not explicitly included
        // in the `singletonActions` list defined above
        actions: (input, context) =>
            singletonTypes.has(context.schemaType)
                ? input.filter(
                      ({ action }) => action && singletonActions.has(action)
                  )
                : input
    }
})
