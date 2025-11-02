import Image from 'next/image'
import React from 'react'

import { getTopTenUsers } from '@/api/requests/users'

import Promo from '@/components/learn/promo'
import Quests from '@/components/learn/quests'
import UserProgress from '@/components/learn/user-progress'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import FeedWrapper from '@/components/wrappers/feed-wrapper'
import StickyWrapper from '@/components/wrappers/sticky-wrapper'

export default async function LeaderboardPage() {
	const leaderboard = await getTopTenUsers()

	return (
		<div className='flex flex-row-reverse gap-12 px-6'>
			<StickyWrapper>
				<UserProgress />
				<Promo />
				<Quests />
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
						Leaderboard
					</h1>
					<p className='text-muted-foreground mb-6 text-center text-lg'>
						See where you stand among other learners in the
						community.
					</p>
					<Separator className='mb-4 h-0.5 rounded-full' />
					{leaderboard?.map((userProgress, i) => (
						<div
							className='flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50'
							key={userProgress.userId}
						>
							<p className='mr-4 font-bold text-lime-700'>
								{i + 1}
							</p>
							<Avatar className='mr-6 ml-3 size-12 border bg-green-500'>
								<AvatarImage
									className='object-cover'
									src={userProgress.user.imageSrc}
								/>
							</Avatar>
							<p className='flex-1 font-bold text-neutral-800'>
								{userProgress.user.name}
							</p>
							<p className='text-muted-foreground'>
								{userProgress.points} XP
							</p>
						</div>
					))}
				</div>
			</FeedWrapper>
		</div>
	)
}
