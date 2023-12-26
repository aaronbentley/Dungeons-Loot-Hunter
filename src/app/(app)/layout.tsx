import '@/assets/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import TailwindIndicator from '@/components/tailwind-indicator'
import ThemeProvider from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.APP_URL!),
    title: {
        default: process.env.APP_TITLE!,
        template: `%s - ${process.env.APP_TITLE!}`
    },
    description: process.env.APP_DESCRIPTION!
}

const AppRootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html
            lang='en'
            className={`${GeistSans.variable}`}
            suppressHydrationWarning>
            <body
                className={cn([
                    'bg-zinc-50',
                    'dark:bg-zinc-950',
                    'text-zinc-900',
                    'dark:text-zinc-100',
                    'font-sans',
                    'antialiased',
                    'min-h-screen'
                ])}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange>
                    <div className='relative flex min-h-screen flex-col'>
                        <Header />
                        <div className='flex-1 flex min-h-max flex-col items-center justify-start gap-y-4 md:gap-y-12'>
                            <Suspense>{children}</Suspense>
                        </div>
                        <Footer />
                    </div>
                    <TailwindIndicator />
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}

export default AppRootLayout
