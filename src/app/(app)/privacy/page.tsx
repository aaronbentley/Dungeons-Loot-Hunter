import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading
} from '@/components/page-header'
import {
    PageSection,
    PageSectionDescription,
    PageSectionHeading
} from '@/components/page-section'
import { Typography } from '@/components/typography'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy'
}

const Privacy = () => (
    <div className='container'>
        <PageHeader className='flex max-w-[980px] flex-col justify-around items-start gap-8 px-4 py-10 md:py-20 mx-auto'>
            <PageHeaderHeading>Privacy</PageHeaderHeading>
            <PageHeaderDescription>
                Our Privacy Policy explains what personal information we
                collect, how we use personal information, how personal
                information is shared, and privacy rights.
            </PageHeaderDescription>
        </PageHeader>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>Context</PageSectionHeading>
            <PageSectionDescription>
                This Privacy Policy is designed to help you understand how we
                collect, use, disclose, and safeguard your personal information
                when you use our website and services.
            </PageSectionDescription>
            <PageSectionDescription>
                By accessing or using our website, you consent to the practices
                described in this Privacy Policy. Please take a moment to review
                the following information.
            </PageSectionDescription>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>Information We Collect</PageSectionHeading>
            <PageSectionDescription>
                We may collect personal information such as:
            </PageSectionDescription>
            <Typography variant='h3'>Log Data</Typography>

            <PageSectionDescription>
                When you visit our website, our servers automatically record
                information that your browser sends, including your IP address,
                browser type, and language, access times, and the referring
                website addresses.
            </PageSectionDescription>
            <PageSectionDescription>
                This data helps us improve our services and provide a better
                user experience.
            </PageSectionDescription>

            <Typography variant='h3'>Analytics</Typography>
            <PageSectionDescription>
                We use{' '}
                <a
                    href='https://vercel.com/docs/analytics/privacy-policy'
                    title='View Vercel Web Analytics privacy policy'
                    target='_blank'
                    className='font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-indigo-500'>
                    Vercel Web Analytics
                </a>{' '}
                to count page views. It does not use cookies, and it does not
                identify you or track you across other websites. We only see
                aggregated figures such as the pages visited, referring sites,
                country, browser and device type.
            </PageSectionDescription>

            <Typography variant='h3'>Search</Typography>
            <PageSectionDescription>
                Site search is provided by{' '}
                <a
                    href='https://www.algolia.com/policies/privacy/'
                    title='View Algolia privacy policy'
                    target='_blank'
                    className='font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-indigo-500'>
                    Algolia
                </a>
                . When you search, your search terms and the results you select
                are sent to Algolia with a random, temporary identifier so we
                can improve search results. This identifier is not stored on
                your device and is not linked to you.
            </PageSectionDescription>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>Cookies & Local Storage</PageSectionHeading>
            <PageSectionDescription>
                We do not use cookies to track you, and we do not show
                advertising.
            </PageSectionDescription>
            <PageSectionDescription>
                The only thing we store on your device is your light or dark
                theme preference, which is saved in your browser&apos;s local
                storage so the site looks the way you left it. It never leaves
                your device, and you can clear it at any time from your
                browser settings.
            </PageSectionDescription>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>How We Use Your Information</PageSectionHeading>
            <PageSectionDescription>
                We use your personal information to:
            </PageSectionDescription>
            <Typography
                variant='ul'
                muted>
                <Typography variant='li'>
                    Provide and improve our services
                </Typography>
                <Typography variant='li'>
                    Analyze and enhance our website&apos;s performance
                </Typography>
                <Typography variant='li'>Improve our search results</Typography>
            </Typography>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>
                How We Share Your Information
            </PageSectionHeading>
            <PageSectionDescription>
                We do not sell, trade, or rent your personal information to
                third parties.
            </PageSectionDescription>
            <PageSectionDescription>
                We only share information with the service providers that run
                this website: Vercel (hosting and analytics) and Algolia
                (search). They process it on our behalf and only to provide
                their services to us.
            </PageSectionDescription>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>Security</PageSectionHeading>
            <PageSectionDescription>
                We take the security of your personal information seriously. We
                implement industry-standard security measures to protect your
                data from unauthorized access, disclosure, alteration, and
                destruction.
            </PageSectionDescription>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>Policy Updates</PageSectionHeading>
            <PageSectionDescription>
                We may update this Privacy Policy periodically. Any changes will
                be posted on this page, and the date of the latest revision will
                be indicated at the top.
            </PageSectionDescription>
            <PageSectionDescription>
                Your continued use of our website after changes are made
                constitutes your acceptance of the revised policy.
            </PageSectionDescription>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionHeading>Contact Us</PageSectionHeading>
            <PageSectionDescription>
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us via DM on{' '}
                <a
                    href={process.env.APP_COMPANY_TWITTER!}
                    title='Contact us via DM on Twitter'
                    target='_blank'
                    className='font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-indigo-500'>
                    Twitter
                </a>
                .
            </PageSectionDescription>
        </PageSection>

        <PageSection className='md:py-10 w-full'>
            <PageSectionDescription>
                Last updated: October, 2026
            </PageSectionDescription>
        </PageSection>
    </div>
)

export default Privacy
