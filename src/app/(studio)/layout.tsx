export const metadata = {
    title: `Sanity Studio - ${process.env.APP_TITLE!}`,
    description: process.env.APP_DESCRIPTION!
}

const StudioRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body
                style={{
                    margin: 0,
                    padding: 0
                }}>
                {children}
            </body>
        </html>
    )
}

export default StudioRootLayout
