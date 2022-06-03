/**
 * Alphonso iFrame Preview
 */

import React from 'react'
import { resolvePreviewUrl } from '../utils/resolve-preview-urls'

const IFramePreview = ({ document }) => {
    // console.log('🦄 ~ file: iframe.js ~ line 9 ~ IFramePreview ~ document', document)
    const { displayed } = document

    // Resolve the url by checking the document type
    const previewUrl = resolvePreviewUrl(displayed)

    return (
        <React.Fragment>
            <iframe
                src={previewUrl}
                style={{
                    width: '100%',
                    margin: '0',
                    padding: '0',
                    height: '100%',
                    position: 'relative'
                }}
                frameBorder={0}
            />
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#E324DA',
                    borderBottomLeftRadius: '4px',
                    top: 0,
                    right: 0,
                    height: '30px'
                }}>
                <a
                    href={previewUrl}
                    target='_blank'
                    style={{
                        color: 'white',
                        fontSize: '0.85rem',
                        marginTop: 0,
                        marginBottom: 0,
                        padding: '1rem',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}
                    rel='noreferrer'>
                    Preview
                </a>
            </div>
        </React.Fragment>
    )
}

export default IFramePreview
