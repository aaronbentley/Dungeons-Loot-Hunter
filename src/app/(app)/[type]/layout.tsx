import { types } from '@/assets/data/types'
import decamelize from 'decamelize'

// Generate segments for [type]
export const generateStaticParams = async () =>
    types.map((type) => ({
        type: decamelize(type, {
            separator: '-'
        })
    }))

const TypeLayout = ({ children }: { children: React.ReactNode }) => {
    return <section>{children}</section>
}

export default TypeLayout
