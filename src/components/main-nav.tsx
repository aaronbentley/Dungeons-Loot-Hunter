'use client'
import { links } from '@/assets/data/links'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MainNav = () => {
    // Get the current pathname
    const pathname = usePathname()

    return (
        <div className='hidden xl:flex'>
            <NavigationMenu>
                <NavigationMenuList>
                    {links.map((link, index) => (
                        <NavigationMenuItem key={index}>
                            <Link
                                href={link.href}
                                legacyBehavior
                                passHref>
                                <NavigationMenuLink
                                    active={pathname === link.href}
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        [
                                            'data-[active]:text-zinc-50',
                                            'dark:data-[active]:text-zinc-950',
                                            'data-[active]:bg-indigo-500',
                                            'dark:data-[active]:bg-indigo-500'
                                        ]
                                    )}>
                                    {link.label}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default MainNav
