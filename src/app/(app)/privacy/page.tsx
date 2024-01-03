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

            <Typography variant='h3'>Google AdSense</Typography>
            <PageSectionDescription>
                We use Google AdSense to display personalized advertisements.
                Google AdSense may collect certain information about your visit,
                such as your IP address, device type, and browsing behavior, to
                provide personalized ads.
            </PageSectionDescription>
            <PageSectionDescription>
                Please refer to{' '}
                <a
                    href='https://policies.google.com/privacy'
                    title='View Google Privacy Policy'
                    target='_blank'
                    className='font-medium text-primary underline underline-offset-4 transition-colors duration-200 hover:text-indigo-500'>
                    Google&apos;s
                </a>{' '}
                Privacy Policy for more information on how they handle this
                data.
            </PageSectionDescription>

            <Typography variant='h3'>Cookies</Typography>
            <PageSectionDescription>
                We use cookies to enhance your experience on our website.
                Cookies are small pieces of data stored on your device that help
                us track and analyze usage patterns.
            </PageSectionDescription>
            <PageSectionDescription>
                You can configure your browser to refuse cookies, but some
                features of the website may not function properly as a result.
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
                <Typography variant='li'>
                    To display personalized advertisements through Google
                    AdSense
                </Typography>
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
                Last updated: January, 2024
            </PageSectionDescription>
        </PageSection>
    </div>
)

export default Privacy
