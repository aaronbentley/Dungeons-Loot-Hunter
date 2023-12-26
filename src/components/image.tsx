'use client'
import { cn } from '@/lib/utils'
import { SanityImageAssetDocument } from '@sanity/client'
import { SanityImage } from 'sanity-image'

const defaultImageWidth = 800
const defaultQuality = 75
const defaultMode = 'cover'

type ImageProps = {
    image: SanityImageAssetDocument | undefined
    width: number
    height?: number | undefined
    priority?: boolean
    quality?: number
    mode?: 'cover' | 'contain'
    htmlWidth?: number
    htmlHeight?: number
    sizes?: string
    className?: string
    [key: string]: any
}

const Image = ({
    image,
    priority = false,
    width = defaultImageWidth,
    height = undefined,
    quality = defaultQuality,
    mode = defaultMode,
    htmlWidth = undefined,
    htmlHeight = undefined,
    sizes = undefined,
    className = undefined,
    ...rest
}: ImageProps) => {
    /**
     * If no image props return null
     */
    if (!image) {
        return null
    }

    /**
     * Destructure image props
     */
    const { asset = undefined, crop, hotspot } = image

    /**
     * Bail early if no asset
     */
    if (!asset) {
        return null
    }

    return (
        <SanityImage
            id={asset._id}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            loading={priority ? 'eager' : 'lazy'}
            // Specify how big it is expected to render so a reasonable srcSet can be generated using `width`, `height`, or both
            width={width}
            height={height}
            // Choose whether you want it to act like `object-fit: cover` or `object-fit: contain`, or leave it out to use the default (contain)
            mode={mode}
            // Want to specify the final rendered dimensions of the image?
            // Pass them in as `htmlWidth` and `htmlHeight` and Sanity will add them as attributes to the img tag
            htmlWidth={htmlWidth ?? undefined}
            htmlHeight={htmlHeight ?? undefined}
            // Have hotspot or crop data from Sanity? Pass it in!
            hotspot={hotspot ?? undefined}
            crop={crop ?? undefined}
            // Want low-quality image previews? Fetch them from Sanity and pass them in too.
            preview={asset.metadata.lqip}
            // Have a burning desire to have Sanity change the format or something?
            // Most of the visual effects from the Sanity Image API are available:
            queryParams={{
                q: quality
            }}
            alt={asset.altText}
            // sizes='(max-width: 640px) 100vw, 640px'
            // sizes="(min-width: 500px) 500px, 100vw"
            className={cn(
                [
                    'block',
                    'h-auto',
                    'max-w-full',
                    'data-[lqip=true]:!min-w-full'
                ],
                className
            )}
            {...rest}
        />
    )
}

export default Image
