import { cn } from '@/lib/utils'
import Link from 'next/link'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'
import ModeToggle from './mode-toggle'
import Search from './search'
import { buttonVariants } from './ui/button'

const Header = () => (
    <header className='sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur'>
        <div className='container px-4 flex items-center'>
            <div className='flex justify-between w-full py-4'>
                <div className='flex flex-row-reverse xl:flex-row items-center md:space-x-4'>
                    <Link
                        href='/'
                        className={cn(buttonVariants({ variant: 'ghost' }), [
                            'flex',
                            'xl:hidden',
                            'font-sans',
                            'font-medium',
                            'text-xl',
                            'tracking-tight'
                        ])}>
                        {process.env.APP_SHORT_TITLE!}
                    </Link>
                    <Link
                        href='/'
                        className={cn(buttonVariants({ variant: 'ghost' }), [
                            'hidden',
                            'xl:flex',
                            'md:mr-6',
                            'font-sans',
                            'font-medium',
                            'text-xl',
                            'tracking-tight'
                        ])}>
                        {process.env.APP_TITLE!}
                    </Link>
                    <MainNav />
                    <MobileNav />
                </div>
                <div className='flex items-center md:space-x-4'>
                    <Search />
                    <ModeToggle />
                </div>
            </div>
        </div>
    </header>
)

export default Header
