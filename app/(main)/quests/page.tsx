'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

import { useGetUserProgressQuery } from '@/api/hooks/useGetUserProgressQuery'

import Promo from '@/components/learn/promo'
import UserProgress from '@/components/learn/user-progress'
import Loading from '@/components/loading'
import { Progress } from '@/components/ui/progress'
import FeedWrapper from '@/components/wrappers/feed-wrapper'
import StickyWrapper from '@/components/wrappers/sticky-wrapper'

import { quests } from '@/data/quests'

export default function QuestsPage() {
	const { data: userProgress, isLoading } = useGetUserProgressQuery()

	if (isLoading) return <Loading />

	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses')
	}

	return (
		<div className='flex flex-row-reverse gap-12 px-6'>
			<StickyWrapper>
				<UserProgress />
				<Promo />
			</StickyWrapper>
			<FeedWrapper>
				<div className='flex w-full flex-col items-center'>
					<Image
						src='/quests.svg'
						alt='Quests'
						width={90}
						height={90}
					/>
					<h1 className='my-6 text-center text-2xl font-bold text-neutral-800'>
						Quests
					</h1>
					<p className='text-muted-foreground mb-6 text-center text-lg'>
						Complete quests by earning points
					</p>
					<ul className='w-full'>
						{quests.map(quest => {
							const progress =
								(userProgress?.points / quest.value) * 100

							return (
								<div
									className='flex w-full items-center gap-x-4 border-t-2 p-4'
									key={quest.title}
								>
									<Image
										src='/points.svg'
										alt='Points'
										height={60}
										width={60}
									/>
									<div className='flex w-full flex-col gap-y-2'>
										<p className='text-xl font-bold text-neutral-700'>
											{quest.title}
										</p>
										<Progress
											value={progress}
											className='h-3'
										/>
									</div>
								</div>
							)
						})}
					</ul>
				</div>
			</FeedWrapper>
		</div>
	)
}
