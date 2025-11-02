'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'

import { SidebarItemProps } from '@/types/sidebar-item'

export default function SidebarItem({
	label,
	iconSrc,
	href
}: SidebarItemProps) {
	const pathname = usePathname()
	const active = pathname === href

	return (
		<Button
			variant={active ? 'sidebarOutline' : 'sidebar'}
			className='h-[52px] justify-start'
			asChild
		>
			<Link href={href}>
				<Image
					src={iconSrc}
					alt={label}
					className='mr-5'
					width={32}
					height={32}
				/>
				{label}
			</Link>
		</Button>
	)
}
