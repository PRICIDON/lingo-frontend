import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import type { ReactNode } from 'react'

import { Providers } from '@/app/providers'

import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const nunito = Nunito({
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Lingo',
		template: '%s | Lingo'
	},
	description: 'Learn more languages'
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${nunito.className} antialiased`}>
				<Providers>
					<Toaster theme='light' richColors />
					{children}
				</Providers>
			</body>
		</html>
	)
}
