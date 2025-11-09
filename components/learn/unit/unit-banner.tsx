import { NotebookText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface UnitBannerProps {
	title: string
	description: string
}

export default function UnitBanner({ title, description }: UnitBannerProps) {
	return (
		<div className='flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white'>
			<div className='space-y-2.5'>
				<h3 className='text-2xl font-bold'>{title}</h3>
				<p className='text-lg'>{description}</p>
			</div>
			<Link href='/lesson'>
				<Button
					variant='secondary'
					size='lg'
					className='hidden border-2 border-b-4 active:border-b-2 lg:flex'
				>
					<NotebookText className='mr-2' />
					Продолжить
				</Button>
			</Link>
		</div>
	)
}

export function UnitBannerSkeleton() {
	return (
		<div className='flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white'>
			<div className='space-y-2.5'>
				<Skeleton className='h-7 w-20' />
				<Skeleton className='h-5 w-30' />
			</div>
			<Button
				variant='secondary'
				size='lg'
				className='hidden border-2 border-b-4 active:border-b-2 lg:flex'
				disabled
			>
				<NotebookText className='mr-2' />
				Продолжить
			</Button>
		</div>
	)
}
