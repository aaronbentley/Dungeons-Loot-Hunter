/* eslint-disable no-console */
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({apiVersion: '2021-10-21'})

/**
 * Set values to find and replace here
 */
//  const DOCUMENT_TYPE = ''
 const FIELD_TO_REPLACE = 'isEventItem'
 const NEW_FIELD_NAME = 'eventItem'

const fetchDocuments = () =>
    client.fetch(
        `*[
            (
                _type == 'meleeWeapons' ||
                _type == 'rangedWeapons' ||
                _type == 'armor' ||
                _type == 'artifacts'
            ) 
          && 
          (
              defined(${FIELD_TO_REPLACE})
          )
        ]
        [0...100] 
        {
            _id, 
            _rev, 
            ${FIELD_TO_REPLACE}
        }`
    )

const buildPatches = (docs) =>
    docs.map((doc) => ({
        id: doc._id,
        patch: {
            set: { [NEW_FIELD_NAME]: doc[FIELD_TO_REPLACE] },
            unset: [FIELD_TO_REPLACE],
            // this will cause the migration to fail if any of the documents has been
            // modified since it was fetched.
            ifRevisionID: doc._rev
        }
    }))

const createTransaction = (patches) =>
    patches.reduce(
        (tx, patch) => tx.patch(patch.id, patch.patch),
        client.transaction()
    )

const commitTransaction = (tx) => tx.commit()

const migrateNextBatch = async () => {
    const documents = await fetchDocuments()
    const patches = buildPatches(documents)
    if (patches.length === 0) {
        console.log('No more documents to migrate!')
        return null
    }
    console.log(
        `Migrating batch:\n %s`,
        patches
            .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
            .join('\n')
    )
    const transaction = createTransaction(patches)
    await commitTransaction(transaction)
    return migrateNextBatch()
}

migrateNextBatch().catch((err) => {
    console.error(err)
    process.exit(1)
})
