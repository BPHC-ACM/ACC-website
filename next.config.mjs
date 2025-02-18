/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ui-avatars.com',
			},
		],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: `
		default-src 'self';
		img-src *;
		script-src 'self' 'unsafe-eval' 'unsafe-inline';
		sandbox;
	  `,
	},
};

export default nextConfig;
