import React from 'react'
import MobileSidebar from './mobile-sidebar'

export default function MobileHeader() {
	return (
		<nav className="lg:hidden px-6 h-[50px] flex items-center bg-gradient-to-b via-green-400 from-green-500 to-green-300  border-b fixed top-0 w-full z-50">
			<MobileSidebar />
		</nav>
	)
}
