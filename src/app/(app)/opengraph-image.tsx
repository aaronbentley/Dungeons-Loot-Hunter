import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = `${process.env.APP_TITLE!}: ${process.env.APP_DESCRIPTION!}`

export const size = {
    width: 2400,
    height: 1260
}

export const contentType = 'image/png'

export const debug = process.env.NODE_ENV !== 'production'

const opengraphImage = async () => {
    // Fonts
    const geistBold = fetch(
        new URL(`${process.env.APP_URL!}/Geist-Bold.otf`)
    ).then((res) => res.arrayBuffer())

    const geistRegular = fetch(
        new URL(`${process.env.APP_URL!}/Geist-Regular.otf`)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            <div
                tw='flex flex-col items-center justify-center h-full w-full'
                style={{
                    background: '#09090b'
                }}>
                <h1
                    tw='text-[10rem] text-zinc-50 max-w-[70vw] text-center tracking-tight'
                    style={{
                        fontFamily: 'GeistBold'
                    }}>
                    {process.env.APP_TITLE!}
                </h1>
                <h2
                    tw='text-[5.5rem] text-zinc-500 max-w-[60vw] text-center tracking-tight'
                    style={{
                        fontFamily: 'GeistRegular'
                    }}>
                    {process.env.APP_DESCRIPTION!}
                </h2>
            </div>
        ),
        {
            ...size,
            debug,
            fonts: [
                {
                    name: 'GeistBold',
                    data: await geistBold,
                    weight: 700,
                    style: 'normal'
                },
                {
                    name: 'GeistRegular',
                    data: await geistRegular,
                    weight: 400,
                    style: 'normal'
                }
            ]
        }
    )
}

export default opengraphImage
