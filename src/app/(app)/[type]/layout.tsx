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
    return (
        <>
            <div className='container'>{children}</div>
        </>
    )
}

export default TypeLayout
