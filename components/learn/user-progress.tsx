'use client'

import { InfinityIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import { useGetUserProgressQuery } from '@/api/hooks/useGetUserProgressQuery'
import { useGetUserSubscriptionQuery } from '@/api/hooks/useGetUserSubscriptionQuery'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export default function UserProgress() {
	const { data: userProgress, isLoading } = useGetUserProgressQuery()
	const { data: userSubscription, isLoading: isLoadingUserSubscription } =
		useGetUserSubscriptionQuery()

	if (isLoading || isLoadingUserSubscription) return <UserProgressSkeleton />
	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses')
	}

	const isPro = !!userSubscription?.isActive

	const activeCourse = userProgress.activeCourse

	return (
		<div className='flex w-full items-center justify-between gap-x-2'>
			<Link href='/courses'>
				<Button variant='ghost'>
					<Image
						src={activeCourse.imageSrc}
						alt={activeCourse.title}
						width={32}
						height={32}
						className='rounded-[3px] border'
					/>
				</Button>
			</Link>
			<Link href='/shop'>
				<Button variant='ghost' className='text-orange-500'>
					<Image
						src='/points.svg'
						alt='Points'
						width={28}
						height={28}
						className='mr-2'
					/>
					{userProgress.points}
				</Button>
			</Link>
			<Link href='/shop'>
				<Button variant='ghost' className='text-rose-500'>
					<Image
						src='/heart.svg'
						alt='Hearts'
						width={22}
						height={22}
						className='mr-2'
					/>
					{isPro ? (
						<InfinityIcon className='size-4 stroke-[3]' />
					) : (
						userProgress.hearts
					)}
				</Button>
			</Link>
		</div>
	)
}

export function UserProgressSkeleton() {
	return (
		<div className='flex w-full items-center justify-between gap-x-2'>
			<Skeleton className='h-11 w-16 rounded-xl' />
			<Skeleton className='h-11 w-24 rounded-xl' />
			<Skeleton className='h-11 w-19 rounded-xl' />
		</div>
	)
}
