import { StructureResolver } from 'sanity/structure'
import { apiVersion } from '../env'

export const structure: StructureResolver = (S, context) => {
    return S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Melee Weapons')
                .schemaType('meleeWeapons')
                .child(
                    S.documentList()
                        .title('Weapons')
                        .apiVersion(apiVersion)
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
                    S.documentList()
                        .title('Weapons')
                        .apiVersion(apiVersion)
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
                    S.documentList()
                        .title('Armor')
                        .apiVersion(apiVersion)
                        .menuItems(S.documentTypeList('armor').getMenuItems())
                        .filter('_type == "armor"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Artifacts')
                .schemaType('artifacts')
                .child(
                    S.documentList()
                        .title('Artifacts')
                        .apiVersion(apiVersion)
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
                    S.documentList()
                        .title('Enchantments')
                        .apiVersion(apiVersion)
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
                    S.documentList()
                        .title('Runes')
                        .apiVersion(apiVersion)
                        .menuItems(S.documentTypeList('runes').getMenuItems())
                        .filter('_type == "runes"')
                        .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),
            S.listItem()
                .title('Ancient Mobs')
                .schemaType('ancientMobs')
                .child(
                    S.documentList()
                        .title('Ancient Mobs')
                        .apiVersion(apiVersion)
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
                    S.documentList()
                        .title('Levels')
                        .apiVersion(apiVersion)
                        .menuItems(S.documentTypeList('levels').getMenuItems())
                        .filter('_type == "levels"')
                        .defaultOrdering([
                            { field: '_createdAt', direction: 'asc' }
                        ])
                ),
            S.listItem()
                .title('Settings')
                .schemaType('siteSettings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('settings')
                )
        ])
}
