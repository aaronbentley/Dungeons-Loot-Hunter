/** @type {import('next').NextConfig} */

/**
 * Set CSP headers
 */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' *.minecraftdungeonsloothunter.app *.sanity.io cdn.jsdelivr.net *.googlesyndication.com *.google.com;
    style-src 'self' 'unsafe-inline' fonts.googleapis.com *.googlesyndication.com;
    img-src 'self' blob: data: *.sanity.io *.githubusercontent.com *.googlesyndication.com *.gstatic.com;
    font-src 'self' fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src 'self' *.doubleclick.net *.google.com *.googlesyndication.com;
    frame-ancestors 'self';
    worker-src 'self' blob:;
    connect-src 'self' ws: *.minecraftdungeonsloothunter.app *.api.sanity.io *.algolia.net *.algolia.io *.googleapis.com *.googlesyndication.com *.google.com;
    block-all-mixed-content;
    upgrade-insecure-requests;
`

const nextConfig = {
    trailingSlash: true,
    crossOrigin: 'anonymous',
    logging: {
        fetches: {
            fullUrl: process.env.NODE_ENV === 'development'
        }
    },
    experimental: {
        taint: true
    },
    async headers() {
        if (process.env.NODE_ENV === 'production') {
            return [
                {
                    source: '/(.*)',
                    headers: [
                        {
                            key: 'X-DNS-Prefetch-Control',
                            value: 'on'
                        },
                        {
                            key: 'Strict-Transport-Security',
                            value: 'max-age=31536000; includeSubDomains; preload'
                        },
                        {
                            key: 'Permissions-Policy',
                            value: 'accelerometer=(),autoplay=(),camera=(),display-capture=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),xr-spatial-tracking=()'
                        },
                        {
                            key: 'X-Content-Type-Options',
                            value: 'nosniff'
                        },
                        {
                            key: 'X-Frame-Options',
                            value: 'DENY'
                        },
                        {
                            key: 'Referrer-Policy',
                            value: 'same-origin'
                        },
                        {
                            // key: 'Content-Security-Policy-Report-Only',
                            key: 'Content-Security-Policy',
                            value: cspHeader.replace(/\n/g, '')
                        }
                    ]
                }
            ]
        }

        return []
    }
}

module.exports = nextConfig
