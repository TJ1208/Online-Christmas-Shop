/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tjcoding.sirv.com',
                port: '',
            },
        ],
    },
}

module.exports = nextConfig
