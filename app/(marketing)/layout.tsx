import React from 'react'
import Header from '@/components/main/header'
import Footer from '@/components/main/footer'

type Props = {
	children: React.ReactNode;
}

export default function MarketingLayout({
  children,
}:Props) {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 flex flex-col items-center justify-center">
				{children}
			</main>
			<Footer />
		</div>
	)
}
