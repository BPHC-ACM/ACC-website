import { Providers } from './providers';

export const metadata = {
	title: {
		default: 'Academic Counselling Cell | BITS Pilani, Hyderabad Campus',
		template: '%s | ACC BPHC',
	},

	description:
		'Your dedicated partner in academic success, providing personalized guidance and support throughout your educational journey at BITS Pilani, Hyderabad Campus.',

	keywords: [
		'BITS Pilani',
		'Academic Counselling',
		'Student Support',
		'Faculty Mentorship',
		'BPHC',
	],

	openGraph: {
		title: 'Academic Counselling Cell | BITS Pilani, Hyderabad Campus',
		description:
			'Empowering your academic journey with guidance and resources.',
		url: 'https://acc-bphc.netlify.app',
		siteName: 'ACC BPHC',
		images: [
			{
				url: 'https://acc-bphc.netlify.app/acc-logo.png',
				width: 512,
				height: 512,
			},
		],
		locale: 'en_US',
		type: 'website',
	},

	twitter: {
		card: 'summary',
		title: 'Academic Counselling Cell | BITS Pilani, Hyderabad Campus',
		description:
			'Empowering your academic journey with guidance and resources.',
		images: ['https://acc-bphc.netlify.app/acc-logo.png'],
	},

	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
					rel='stylesheet'
				/>
				<title>Academic Counselling Cell | BPHC</title>
				<link
					rel='icon'
					type='image/x-icon'
					href='/acc-small-icon.ico'
				/>
				<link rel='icon' type='image/x-icon' href='/acc-icon.ico' />
				<link rel='icon' type='image/png' href='/acc-icon.png' />
				<meta
					name='google-site-verification'
					content='UBu4QubhSpH5GIt8R1WSvv9Moy-Y71t5w0aBzpzVKyk'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<meta
					name='description'
					content='Academic Counselling Cell | BPHC'
				/>
				<meta
					name='keywords'
					content='Academic Counselling Cell, BPHC'
				/>
				<meta name='author' content='Academic Counselling Cell, BPHC' />
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
