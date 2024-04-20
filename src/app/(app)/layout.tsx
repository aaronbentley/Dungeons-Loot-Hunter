import '@/assets/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Preconnect from '@/components/preconnect'
import TailwindIndicator from '@/components/tailwind-indicator'
import ThemeProvider from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
// import VisualEditing from '@/components/visual-editing'
import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
// import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import { Suspense } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config'

// export const generateViewport = async (): Promise<Viewport> => {
export const generateViewport = (): Viewport => {
    /**
     * Resolve Tailwind CSS config
     */
    const fullConfig = resolveConfig(tailwindConfig)

    /**
     * Get color values from Tailwind CSS config
     */
    const colors = fullConfig?.theme?.colors
    const themeColor = colors?.indigo?.['500']
    return {
        themeColor: themeColor
    }
}

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
                    'min-h-screen',
                    'overflow-x-hidden'
                ])}>
                <Preconnect />
                {process.env.NODE_ENV === 'production' && (
                    <Script
                        async
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process
                            .env.GOOGLE_ADSENSE_ID!}`}
                        strategy='beforeInteractive'
                        crossOrigin='anonymous'
                    />
                )}
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange>
                    <TooltipProvider>
                        <div className='relative flex min-h-screen flex-col'>
                            <Header />
                            <div className='flex-1 flex min-h-max flex-col items-center justify-start gap-y-4 md:gap-y-12'>
                                <Suspense>{children}</Suspense>
                                {draftMode().isEnabled && <VisualEditing />}
                            </div>
                            <Footer />
                        </div>
                    </TooltipProvider>
                    <TailwindIndicator />
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    )
}

export default AppRootLayout
