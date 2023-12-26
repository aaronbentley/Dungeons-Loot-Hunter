/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { colorInput } from '@sanity/color-input'
// Vision is a tool that lets you query your content with GROQ in the studio https://www.sanity.io/docs/the-vision-plugin
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { structure } from './sanity/config/structure'
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { presentationTool } from 'sanity/presentation'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schema'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    plugins: [
        deskTool({
            structure
        }),
        visionTool({ defaultApiVersion: apiVersion }),
        presentationTool({
            previewUrl: process.env.APP_URL!
        }),
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
