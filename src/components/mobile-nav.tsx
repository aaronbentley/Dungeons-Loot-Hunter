'use client'

import { links } from '@/assets/data/links'
import { cn } from '@/lib/utils'
import { Coffee, Menu } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { navigationMenuTriggerStyle } from './ui/navigation-menu'
import { ScrollArea } from './ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const MobileNav = () => {
    // Handle menu state
    const [open, setOpen] = useState(false)

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size='icon'
                    variant='ghost'
                    className='xl:hidden'>
                    <Menu className='h-[1.2rem] w-[1.2rem]' />
                    <span className='sr-only'>Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side='left'
                className='pr-0 pl-8 border-indigo-500/25'>
                <MobileLink
                    href='/'
                    className='flex items-center'
                    onOpenChange={setOpen}>
                    <span
                        className={cn([
                            'font-sans',
                            'font-medium',
                            'text-xl',
                            'tracking-tight'
                            // 'transition-colors',
                            // 'duration-200',
                            // 'hover:text-indigo-500'
                        ])}>
                        {process.env.NEXT_PUBLIC_APP_SHORT_TITLE!}
                    </span>
                </MobileLink>
                <ScrollArea className='mt-8 mb-4 h-[calc(100vh-8rem)] pb-10'>
                    <div className='flex flex-col space-y-2'>
                        {links.map((link, index) => (
                            <MobileLink
                                key={index}
                                href={link.href}
                                onOpenChange={setOpen}>
                                {link.label}
                            </MobileLink>
                        ))}
                        <Button
                            asChild
                            className='group'>
                            <a
                                href='https://www.buymeacoffee.com/aaronbentley'
                                target='_blank'
                                className={cn(
                                    buttonVariants({ variant: 'default' }),
                                    ['w-min']
                                )}>
                                <Coffee className='w-4 h-4 me-2 transition-all duration-200 group-hover:scale-125' />
                                Buy me a coffee
                            </a>
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
}

const MobileLink = ({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const active = pathname === href

    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString())
                onOpenChange?.(false)
            }}
            className={cn(
                navigationMenuTriggerStyle(),
                buttonVariants({ variant: 'ghost' }),
                // active && [
                //     'text-zinc-50',
                //     'dark:text-zinc-950',
                //     'bg-indigo-500',
                //     'dark:bg-indigo-500'
                // ],
                className
            )}
            {...props}>
            {children}
        </Link>
    )
}
