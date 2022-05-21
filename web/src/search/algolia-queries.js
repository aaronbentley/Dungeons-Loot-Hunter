/**
 * MC Dungeons Loot Hunter Algolia queries for store
 */

const meleeWeaponsQuery = `
 {
    meleeWeapons: allSanityMeleeWeapons {
      edges {
        node {
          _type
          id
          title
          slug {
            current
          }
        }
      }
    }
  }
 `

const meleeWeaponToAlgoliaRecord = ({ node: { _type, id, title, slug } }) => {
    return {
        objectID: id,
        title
    }
}

const queries = [
    {
        query: meleeWeaponsQuery,
        transformer: ({ data }) =>
            data.meleeWeapons.edges.map(meleeWeaponToAlgoliaRecord),
        indexName: 'meleeWeapons'
        // settings: { attributesToSnippet: [`excerpt:20`] }
    }
]
module.exports = queries
