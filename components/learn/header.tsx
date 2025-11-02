'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { useGetUserProgressQuery } from '@/api/hooks/useGetUserProgressQuery'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function Header() {
	const { data: userProgress, isLoading } = useGetUserProgressQuery()

	if (isLoading) return <HeaderSkeleton />

	return (
		<div className='sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:mt-[-28px] lg:pt-[28px]'>
			<Link href='/courses'>
				<Button variant='ghost' size='sm'>
					<ArrowLeft className='size-5 stroke-2 text-neutral-400' />
				</Button>
			</Link>
			<h1 className='text-lg font-bold'>
				{userProgress?.activeCourse.title}
			</h1>
			<div />
		</div>
	)
}

function HeaderSkeleton() {
	return (
		<div className='sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:mt-[-28px] lg:pt-[28px]'>
			<Skeleton className='h-8 w-10 rounded-xl' />
			<Skeleton className='h-8 w-16' />
			<div />
		</div>
	)
}
