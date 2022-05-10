/**
 * Sanity Desk Structure
 *
 */
import S from '@sanity/desk-tool/structure-builder'
import Emoji from 'a11y-react-emoji'
import React from 'react'

const SettingsIcon = () => <Emoji style={{fontSize: '1.8em'}} symbol="⚙️" />

// Modify menu item for singleton site settings.
export default () =>
    S.list()
        .title('Content')
        .items([
            ...S.documentTypeListItems().filter(listItem => !['siteSettings', 'media.tag' ].includes(listItem.getId())),
            S.listItem()
            .title('Settings')
            .icon(SettingsIcon)
            .child(
                S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
            ),
        ])
