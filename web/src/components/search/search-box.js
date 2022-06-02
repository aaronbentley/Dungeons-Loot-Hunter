/**
 * MC Dungeons Loot Hunter Alogolia Search Box
 */
import { FormControl, FormLabel, Input, VisuallyHidden } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchBox } from 'react-instantsearch-hooks-web'

const SearchBox = ( props ) => {

    const inputRef = useRef( null )

    const { query, refine } = useSearchBox( props )
    const [value, setValue] = useState( query )

    // Track when the value coming from the React state changes to synchronize it with InstantSearch.
    useEffect( () => {
        if ( query !== value ) {
            refine( value )
        }
    }, [value, refine] )

    // Track when the InstantSearch query changes to synchronize it with the React state.
    useEffect( () => {
        // We bypass the state update if the input is focused to avoid concurrent
        // updates when typing.
        if ( document.activeElement !== inputRef.current && query !== value ) {
            setValue( query )
        }
        // We don't want to track when the React state value changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query] )

    return (
        <FormControl display='flex' justifyContent='center'>
            <VisuallyHidden>
                <FormLabel htmlFor='search'>Search</FormLabel>
            </VisuallyHidden>
            <Input
                id='search'
                type='search'
                value={value}
                onChange={( e ) => {
                    setValue( e.target.value )
                }}
                // onChange={(e) => onInput(e)}
                // onChange={onInput}
                placeholder='What loot are you looking for?'
                size='lg'
                variant='filled'
                focusBorderColor='purple.400'
                textAlign='center'
                maxWidth='xl'
                {...props} />
        </FormControl>
    )
}

export default SearchBox
