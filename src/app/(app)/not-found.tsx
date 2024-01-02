import { PageSection } from '@/components/page-section'
import { Typography } from '@/components/typography'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Not Found',
    description: 'It appears this side quest has been lost to the void.'
}

const NotFound = async () => (
    <div className='container'>
        <PageSection className='w-full flex flex-col items-center gap-8 py-16 md:py-24'>
            <Typography
                variant='h1'
                className='text-center text-balance'>
                This side quest has been lost to the void.
            </Typography>
            <Link
                href='/'
                className={cn(buttonVariants({ variant: 'default' }), [
                    'mt-4',
                    'bg-indigo-500',
                    'dark:bg-indigo-500',
                    'hover:bg-indigo-500/90',
                    'hover:dark:bg-indigo-500/90'
                ])}>
                Respawn
            </Link>
        </PageSection>
    </div>
)

export default NotFound
