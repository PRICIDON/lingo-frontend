import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import UserButton from '@/components/auth/user-button'

import { sidebarItems } from '@/data/sidebar-items'

import { cn } from '@/lib/utils'

import SidebarItem from './sidebar-item'

type Props = {
	className?: string
}

export default function Sidebar({ className }: Props) {
	return (
		<div
			className={cn(
				'top-0 left-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]',
				className
			)}
		>
			<Link href='/learn'>
				<div className='flex items-center gap-x-3 pt-8 pb-7 pl-4'>
					<Image
						src='/mascot.svg'
						alt='Mascot'
						height={40}
						width={40}
					/>
					<h1 className='text-2xl font-extrabold tracking-wide text-green-600'>
						Lingo
					</h1>
				</div>
			</Link>
			<div className='flex flex-1 flex-col gap-y-2'>
				{sidebarItems.map(({ label, iconSrc, href }, i) => (
					<SidebarItem
						label={label}
						iconSrc={iconSrc}
						href={href}
						key={i}
					/>
				))}
			</div>
			<div className='p-4'>
				<UserButton />
			</div>
		</div>
	)
}
