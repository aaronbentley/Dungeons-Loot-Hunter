/**
 * Sanity Desk Structure
 *
 */
import S from '@sanity/desk-tool/structure-builder'
import Emoji from 'a11y-react-emoji'
import React from 'react'
import IFramePreview from '../schemas/previews/iframe'

/**
 * Create icon emojis for menu items
 */
const SettingsIcon = () => <Emoji style={{ fontSize: '1.8em' }} symbol='⚙️' />

/**
 * Add web preview to schema types
 */
export const getDefaultDocumentNode = ({ schemaType }) => {
    // console.log('🦄 ~ file: sanity-structure.js ~ line 11 ~ getDefaultDocumentNode ~ schemaType', { schemaType })
    const addPreviewToSchemaTypes = [
        'meleeWeapons',
        'rangedWeapons',
        'armor',
        'artifacts',
        'ancientMobs'
    ]
    // Conditionally return a different configuration based on the schema type

    if (addPreviewToSchemaTypes.includes(schemaType)) {
        return S.document().views([
            S.view.form(),
            S.view.component(IFramePreview).title('Web')
        ])
    }
}

// Modify menu item for singleton site settings.
export default () =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Melee Weapons')
                .schemaType('meleeWeapons')
                .child(
                    S.documentList('meleeWeapons')
                        .title('Weapons')
                        .menuItems(
                            S.documentTypeList('meleeWeapons').getMenuItems()
                        )
                        .filter('_type == "meleeWeapons"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Ranged Weapons')
                .schemaType('rangedWeapons')
                .child(
                    S.documentList('rangedWeapons')
                        .title('Weapons')
                        .menuItems(
                            S.documentTypeList('rangedWeapons').getMenuItems()
                        )
                        .filter('_type == "rangedWeapons"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Armor')
                .schemaType('armor')
                .child(
                    S.documentList('armor')
                        .title('Armor')
                        .menuItems(S.documentTypeList('armor').getMenuItems())
                        .filter('_type == "armor"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Artifacts')
                .schemaType('artifacts')
                .child(
                    S.documentList('artifacts')
                        .title('Artifacts')
                        .menuItems(
                            S.documentTypeList('artifacts').getMenuItems()
                        )
                        .filter('_type == "artifacts"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Enchantments')
                .schemaType('enchantments')
                .child(
                    S.documentList('enchantments')
                        .title('Enchantments')
                        .menuItems(
                            S.documentTypeList('enchantments').getMenuItems()
                        )
                        .filter('_type == "enchantments"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Runes')
                .schemaType('runes')
                .child(
                    S.documentList('runes')
                        .title('Runes')
                        .menuItems(S.documentTypeList('runes').getMenuItems())
                        .filter('_type == "runes"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Ancient Mobs')
                .schemaType('ancientMobs')
                .child(
                    S.documentList('ancientMobs')
                        .title('Ancient Mobs')
                        .menuItems(
                            S.documentTypeList('ancientMobs').getMenuItems()
                        )
                        .filter('_type == "ancientMobs"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Levels')
                .schemaType('levels')
                .child(
                    S.documentList('levels')
                        .title('Levels')
                        .menuItems(S.documentTypeList('levels').getMenuItems())
                        .filter('_type == "levels"')
                        .defaultOrdering([
                            { field: '_createdAt', direction: 'asc' }
                        ])
                ),
            S.documentListItem()
                .title('Settings')
                .schemaType('siteSettings')
                .icon(SettingsIcon)
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('settings')
                )
        ])
