import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'e-libraryrest.samdu.uz',
			},
		],
	},
}
const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
