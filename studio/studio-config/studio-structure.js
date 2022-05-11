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
            S.listItem()
                .title('Melee Weapons')
                .schemaType('meleeWeapons')
                .child(
                    S.documentList('meleeWeapons')
                        .title('Weapons')
                        .menuItems(S.documentTypeList('meleeWeapons').getMenuItems())
                        .filter('_type == "meleeWeapons"')
                        .defaultOrdering( [ { field: 'title', direction: 'asc'} ] )
                ),
            S.listItem()
                .title('Ranged Weapons')
                .schemaType('rangedWeapons')
                .child(
                    S.documentList('rangedWeapons')
                        .title('Weapons')
                        .menuItems(S.documentTypeList('rangedWeapons').getMenuItems())
                        .filter('_type == "rangedWeapons"')
                        .defaultOrdering( [ { field: 'title', direction: 'asc'} ] )
                ),
            S.listItem()
                .title('Armor')
                .schemaType('armor')
                .child(
                    S.documentList('armor')
                        .title('Armor')
                        .menuItems(S.documentTypeList('armor').getMenuItems())
                        .filter('_type == "armor"')
                        .defaultOrdering( [ { field: 'title', direction: 'asc'} ] )
                ),
            S.listItem()
                .title('Artifacts')
                .schemaType('artifacts')
                .child(
                    S.documentList('artifacts')
                        .title('Artifacts')
                        .menuItems(S.documentTypeList('artifacts').getMenuItems())
                        .filter('_type == "artifacts"')
                        .defaultOrdering( [ { field: 'title', direction: 'asc'} ] )
                ),
            S.listItem()
                .title('Enchantments')
                .schemaType('enchantments')
                .child(
                    S.documentList('enchantments')
                        .title('Enchantments')
                        .menuItems(S.documentTypeList('enchantments').getMenuItems())
                        .filter('_type == "enchantments"')
                        .defaultOrdering( [ { field: 'title', direction: 'asc'} ] )
                ),
            S.listItem()
                .title('Runes')
                .schemaType('runes')
                .child(
                    S.documentList('runes')
                        .title('Runes')
                        .menuItems(S.documentTypeList('runes').getMenuItems())
                        .filter('_type == "runes"')
                        .defaultOrdering( [ { field: 'title', direction: 'asc'} ] )
                ),
            S.listItem()
                .title('Ancient Mobs')
                .schemaType('ancientMobs')
                .child(
                    S.documentList('ancientMobs')
                        .title('Ancient Mobs')
                        .menuItems(S.documentTypeList('ancientMobs').getMenuItems())
                        .filter('_type == "ancientMobs"')
                        .defaultOrdering( [ { field: 'title', direction: 'asc'} ] )
                ),
            S.listItem()
                .title('Settings')
                .icon(SettingsIcon)
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                )
        ])
