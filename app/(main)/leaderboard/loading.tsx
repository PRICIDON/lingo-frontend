import Image from 'next/image'
import React from 'react'

import { QuestSkeleton } from '@/components/learn/quests'
import { UserProgressSkeleton } from '@/components/learn/user-progress'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import FeedWrapper from '@/components/wrappers/feed-wrapper'
import StickyWrapper from '@/components/wrappers/sticky-wrapper'

export default function Loading() {
	return (
		<div className='flex flex-row-reverse gap-12 px-6'>
			<StickyWrapper>
				<UserProgressSkeleton />
				<QuestSkeleton />
			</StickyWrapper>
			<FeedWrapper>
				<div className='flex w-full flex-col items-center'>
					<Image
						src='/leaderboard.svg'
						alt='Leaderboard'
						width={90}
						height={90}
					/>
					<h1 className='my-6 text-center text-2xl font-bold text-neutral-800'>
						Доска лидеров
					</h1>
					<p className='text-muted-foreground mb-6 text-center text-lg'>
						Смотрите, какое место вы занимаете среди других
						участников сообщества.
					</p>
					<Separator className='mb-4 h-0.5 rounded-full' />
					{Array.from({ length: 10 }).map((_, i) => (
						<div
							className='flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50'
							key={i}
						>
							<p className='mr-4 font-bold text-lime-700'>
								{i + 1}
							</p>
							<div className='mr-6 ml-3 size-12'>
								<Skeleton className='bg-muted flex size-full items-center justify-center rounded-full' />
							</div>
							<div className='flex-1'>
								<Skeleton className='h-4 w-30' />
							</div>
							<p className='text-muted-foreground'>0 XP</p>
						</div>
					))}
				</div>
			</FeedWrapper>
		</div>
	)
}
