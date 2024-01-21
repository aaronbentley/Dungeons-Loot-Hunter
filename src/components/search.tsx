'use client'

import algoliasearch from 'algoliasearch/lite'
import { Hit } from 'instantsearch.js'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
    UseConfigureProps,
    UseHitsProps,
    UseSearchBoxProps,
    useConfigure,
    useHits,
    useSearchBox
} from 'react-instantsearch'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from './ui/command'

const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
    search(query)
}

const CustomConfigure = (props: UseConfigureProps) => {
    useConfigure({
        hitsPerPage: 10,
        analytics: true
    })

    return null
}

const SearchBox = (
    props: UseSearchBoxProps & {
        commandOpenChange: (open: boolean) => void
    }
) => {
    const { query, refine } = useSearchBox({
        queryHook
    })
    const [inputValue, setInputValue] = useState(query)
    const inputRef = useRef<HTMLInputElement>(null)

    const setQuery = (newQuery: string) => {
        setInputValue(newQuery)
        refine(newQuery)
    }

    return (
        <Command shouldFilter={false}>
            <CommandInput
                ref={inputRef}
                value={inputValue}
                onValueChange={setQuery}
                placeholder='What loot are you looking for?'
                {...props}
            />
            <CommandList>
                <Hits commandOpenChange={props.commandOpenChange} />
            </CommandList>
        </Command>
    )
}

const Hits = (
    props: UseHitsProps & {
        commandOpenChange: (open: boolean) => void
    }
) => {
    const router = useRouter()
    const { hits } = useHits(props)
    const { query } = useSearchBox()

    if (query && hits && hits.length === 0) {
        return <CommandEmpty>No items found.</CommandEmpty>
    }

    if (!query) {
        return (
            <CommandGroup heading='Suggestions'>
                {hits &&
                    hits.map((hit: Hit) => (
                        <CommandItem
                            key={hit.objectID}
                            onSelect={() => {
                                props.commandOpenChange(false)
                                router.push(hit.url)
                            }}
                            className='gap-4 items-center'
                            {...props}>
                            {hit.title}
                            <div className='flex gap-2 pointer-events-none'>
                                {hit.unique == true ? (
                                    <Badge
                                        variant='secondary'
                                        className='text-xs text-orange-500 dark:text-orange-500 bg-orange-50 dark:bg-orange-950 border-orange-50 dark:border-orange-950'>
                                        Unique
                                    </Badge>
                                ) : (
                                    <>
                                        <Badge className='text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-900'>
                                            Common
                                        </Badge>
                                        <Badge className='text-xs text-emerald-500 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950 border-emerald-50 dark:border-emerald-950'>
                                            Rare
                                        </Badge>
                                    </>
                                )}
                            </div>
                        </CommandItem>
                    ))}
            </CommandGroup>
        )
    }

    return (
        <>
            <CommandGroup heading='Results'>
                {query &&
                    hits.map((hit: Hit) => (
                        <CommandItem
                            key={hit.objectID}
                            onSelect={() => {
                                props.commandOpenChange(false)
                                router.push(hit.url)
                            }}
                            className='gap-4'
                            {...props}>
                            {hit.title}
                            <div className='flex gap-2 pointer-events-none'>
                                {hit.unique == true ? (
                                    <Badge
                                        variant='secondary'
                                        className='text-xs text-orange-500 dark:text-orange-500 bg-orange-50 dark:bg-orange-950 border-orange-50 dark:border-orange-950'>
                                        Unique
                                    </Badge>
                                ) : (
                                    <>
                                        <Badge className='text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-900'>
                                            Common
                                        </Badge>
                                        <Badge className='text-xs text-emerald-500 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-950 border-emerald-50 dark:border-emerald-950'>
                                            Rare
                                        </Badge>
                                    </>
                                )}
                            </div>
                        </CommandItem>
                    ))}
            </CommandGroup>
        </>
    )
}

const Search = () => {
    /**
     * Quick flag to disable search if over Alogoia's free tier quota
     */
    const searchActive = true

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [])

    const searchClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
    )

    if (!searchActive) {
        return null
    }

    return (
        <>
            <Button
                size='icon'
                variant='ghost'
                onClick={() => setOpen(!open)}
                className='w-9 px-0'>
                <SearchIcon className='size-[1.2rem]' />
                <span className='sr-only'>Search</span>
            </Button>
            <InstantSearchNext
                searchClient={searchClient}
                indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!}
                insights={true}
                future={{
                    preserveSharedStateOnUnmount: false
                }}>
                <CustomConfigure />
                <CommandDialog
                    open={open}
                    onOpenChange={setOpen}>
                    <SearchBox commandOpenChange={setOpen} />
                </CommandDialog>
            </InstantSearchNext>
        </>
    )
}

export default Search
