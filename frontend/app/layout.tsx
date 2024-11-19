import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

export const metadata: Metadata = {
	title: 'WorkTradeHub',
	description: 'A platform for trading work and skills',
	openGraph: {
		title: 'WorkTradeHub',
		siteName: 'WorkTradeHub',
		url: 'https://worktradehub.com',
		description: 'A platform for trading work and skills',
		images: [
			{
				url: '/og.png',
				width: 1920,
				height: 1080
			}
		]
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} scroll-smooth w-full h-screen antialiased`}>
				{children}
			</body>
		</html>
	)
}
