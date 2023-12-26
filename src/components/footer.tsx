import { Copyright } from 'lucide-react'

const Footer = () => (
    <footer className='py-6 md:px-8 md:pt-12 lg:pt-24 md:pb-4'>
        <div className='container flex flex-col items-center justify-between gap-4 py-4 md:flex-row text-zinc-400 dark:text-zinc-600 text-sm'>
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
