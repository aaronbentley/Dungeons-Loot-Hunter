export const metadata = {
    title: `Sanity Studio - ${process.env.APP_TITLE!}`,
    description: process.env.APP_DESCRIPTION!
}

const StudioRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    )
}

export default StudioRootLayout
