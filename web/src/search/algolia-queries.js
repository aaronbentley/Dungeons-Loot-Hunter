/**
 * MC Dungeons Loot Hunter Algolia queries for store
 */
// import SanityImageUrlBuilder from '../components/sanity-image-url-builder/sanity-image-url-builder'
// const SanityImageUrlBuilder = require('../components/sanity-image-url-builder/sanity-image-url-builder')
const slugify = require('slugify')
const sanityClient = require('@sanity/client')
const imageUrlBuilder = require('@sanity/image-url')

// Set index name
const INDEX_NAME = 'mcd-loot-index'

// Create Sanity client
const client = sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: process.env.GATSBY_SANITY_DATASET,
    token: process.env.GATSBY_SANITY_TOKEN,
    apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
    useCdn: true // `false` if you want to ensure fresh data
})

// Create builder using Sanity client
const builder = imageUrlBuilder(client)

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
        isUnique
        image {
          asset {
            _id
            altText
            metadata {
              preview: lqip
            }
          }
          hotspot {
            height
            width
            x
            y
          }
          crop {
            bottom
            left
            right
            top
          }
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
        isUnique
        image {
          asset {
            _id
            altText
            metadata {
              preview: lqip
            }
          }
          hotspot {
            height
            width
            x
            y
          }
          crop {
            bottom
            left
            right
            top
          }
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
        isUnique
        image {
          asset {
            _id
            altText
            metadata {
              preview: lqip
            }
          }
          hotspot {
            height
            width
            x
            y
          }
          crop {
            bottom
            left
            right
            top
          }
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
        isUnique
        image {
          asset {
            _id
            altText
            metadata {
              preview: lqip
            }
          }
          hotspot {
            height
            width
            x
            y
          }
          crop {
            bottom
            left
            right
            top
          }
        }
      }
    }
  }
}
`

// Tranform slug and add imagedata and image
const nodeToAlgoliaRecord = ({
    node: { _type, id, title, slug, image, isUnique }
}) => {
    // Build node type slug
    const typeSlug = slugify(_type.replace(/[A-Z]/g, '-$&'), {
        lower: true
    })

    return {
        objectID: id,
        title: title,
        unique: isUnique ? true : false,
        imageData: image,
        image: builder.image(image).size(256, 256).dpr(2).format('webp').url(),
        url: `/${typeSlug}/${slug.current}/`
    }
}

const queries = [
    {
        query: meleeWeaponsQuery,
        transformer: ({ data }) =>
            data.meleeWeapons.edges.map(nodeToAlgoliaRecord),
        indexName: INDEX_NAME
    },
    {
        query: rangedWeaponsQuery,
        transformer: ({ data }) =>
            data.rangedWeapons.edges.map(nodeToAlgoliaRecord),
        indexName: INDEX_NAME
    },
    {
        query: armorQuery,
        transformer: ({ data }) => data.armor.edges.map(nodeToAlgoliaRecord),
        indexName: INDEX_NAME
    },
    {
        query: artifactsQuery,
        transformer: ({ data }) =>
            data.artifacts.edges.map(nodeToAlgoliaRecord),
        indexName: INDEX_NAME
    }
]
module.exports = queries
