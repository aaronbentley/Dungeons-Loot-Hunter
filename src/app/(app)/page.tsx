import { links } from '@/assets/data/links'
import { PageSection } from '@/components/page-section'
import { Typography } from '@/components/typography'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const Home = async () => (
    <div className='container'>
        <PageSection className='w-full flex flex-col items-center gap-8 py-16 md:py-24'>
            <Typography
                variant='h1'
                className='text-center text-balance'>
                {process.env.APP_TITLE!}
            </Typography>
            <Typography
                variant='lead'
                as='h2'
                className='text-lg sm:text-2xl max-w-[240px] sm:max-w-[340px] text-center'>
                {process.env.APP_DESCRIPTION!}
            </Typography>
        </PageSection>

        <div className='grid sm:grid-cols-2 md:grid-flow-dense md:grid-cols-3 gap-8 mt-2 max-w-[1080px] mx-auto'>
            {links.map((link, index) => (
                <Link
                    href={link.href}
                    key={index}
                    className='group'>
                    <Card className='duration-200 transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-50 group-hover:dark:bg-indigo-950'>
                        <CardHeader>
                            <CardTitle className='font-medium text-xl md:text-2xl duration-200 transition-colors group-hover:text-indigo-500'>
                                {link.label}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
)

export default Home
