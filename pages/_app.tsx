import Head from 'next/head';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>MyTop - наш лучший топ</title>
				<link key={1} rel='icon' href='/favicon.ico' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap'
					rel='stylesheet'
				></link>
				<meta property={'og:url'} content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
				<meta property={'og:locale'} content='ru_RU' />
				<meta property={'og:type'} content='ru_RU' />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
