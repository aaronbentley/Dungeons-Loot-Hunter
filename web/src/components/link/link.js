/**
 * MC Dungeons Loot Hunter Link
 */
import { chakra, Link as ChakraLink } from '@chakra-ui/react'
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

const Link = React.forwardRef(
    ({ children, to, activeClassName, partiallyActive, ...rest }, ref) => {
        // Tailor the following test to your environment.
        // This example assumes that any internal link (intended for Gatsby)
        // will start with exactly one slash, and that anything else is external.
        const internal = /^\/(?!\/)/.test(to)

        // Use Chakra UI Link as Gatsby Link for internal links, and <a> for others
        if (internal) {
            return (
                <ChakraLink
                    ref={ref}
                    as={GatsbyLink}
                    to={to}
                    textDecoration='none'
                    {...rest}>
                    {children}
                </ChakraLink>
            )
        }
        return (
            <chakra.a ref={ref} href={to} {...rest}>
                {children}
            </chakra.a>
        )
    }
)

export default Link
