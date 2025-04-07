'use client';
import { UserProvider } from '@/context/userContext';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
					rel='stylesheet'
				/>
				<title>Academic Counselling Cell | BPHC</title>
				<link rel='icon' href='/acc-logo.png' />
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
				<UserProvider>{children}</UserProvider>
			</body>
		</html>
	);
}
