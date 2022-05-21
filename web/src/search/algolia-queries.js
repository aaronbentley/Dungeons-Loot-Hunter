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

const rangedWeaponsQuery = `
 {
    rangedWeapons: allSanityRangedWeapons {
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

const armorQuery = `
 {
  armor: allSanityArmor {
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

const artifactsQuery = `
 {
  artifacts: allSanityArtifacts {
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

const rangedWeaponToAlgoliaRecord = ({ node: { _type, id, title, slug } }) => {
    return {
        objectID: id,
        title
    }
}

const armorToAlgoliaRecord = ({ node: { _type, id, title, slug } }) => {
    return {
        objectID: id,
        title
    }
}

const artifactToAlgoliaRecord = ({ node: { _type, id, title, slug } }) => {
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
    },
    {
        query: rangedWeaponsQuery,
        transformer: ({ data }) =>
            data.rangedWeapons.edges.map(rangedWeaponToAlgoliaRecord),
        indexName: 'rangedWeapons'
    },
    {
        query: armorQuery,
        transformer: ({ data }) => data.armor.edges.map(armorToAlgoliaRecord),
        indexName: 'armor'
    },
    {
        query: artifactsQuery,
        transformer: ({ data }) =>
            data.artifacts.edges.map(artifactToAlgoliaRecord),
        indexName: 'artifacts'
    }
]
module.exports = queries
