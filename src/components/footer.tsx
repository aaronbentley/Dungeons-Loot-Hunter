import { cn } from '@/lib/utils'
import { Coffee, Copyright } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'

const Footer = () => (
    <footer className='py-6 md:px-8 md:pt-12 lg:pt-24 md:pb-0'>
        <div className='container flex flex-col items-center justify-center gap-4 py-4 text-zinc-600 dark:text-zinc-400 text-sm'>
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

            <div className='flex flex-col items-center gap-2'>
                <div className='flex gap-2 items-center'>
                    <Copyright className='w-3 h-3' />
                    <span>
                        {new Date().getFullYear()}{' '}
                        <a
                            href={process.env.APP_COMPANY_URL!}
                            target='_blank'
                            className='hover:text-indigo-500'>
                            {process.env.APP_COMPANY!}
                        </a>
                        . All rights reserved.
                    </span>
                </div>

                <Link
                    href='/privacy/'
                    className='hover:text-indigo-500'>
                    Privacy Policy
                </Link>
            </div>
        </div>
    </footer>
)

export default Footer
