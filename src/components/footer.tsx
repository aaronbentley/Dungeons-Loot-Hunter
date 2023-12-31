import { cn } from '@/lib/utils'
import { Coffee, Copyright } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'

const Footer = () => (
    <footer className='py-6 md:px-8 md:pt-12 lg:pt-24 md:pb-4'>
        <div className='container flex flex-col items-center justify-center gap-4 py-4 text-zinc-400 dark:text-zinc-600 text-sm'>
            <Button
                asChild
                className='group'>
                <a
                    href='https://www.buymeacoffee.com/aaronbentley'
                    target='_blank'
                    className={cn(buttonVariants({ variant: 'default' }))}>
                    <Coffee className='w-4 h-4 me-2 transition-all duration-200 group-hover:scale-125' />
                    Buy me a coffee
                </a>
            </Button>

            <div className='flex items-center gap-x-2'>
                <Copyright className='w-3 h-3' />
                <span>
                    {new Date().getFullYear()}{' '}
                    <a
                        href={process.env.APP_COMPANY_URL!}
                        target='_blank'
                        className='hover:text-pink-500'>
                        {process.env.APP_COMPANY!}
                    </a>
                    . All rights reserved.
                </span>
            </div>
        </div>
    </footer>
)

export default Footer
