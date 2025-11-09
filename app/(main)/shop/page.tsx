'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

import { useGetAllPlansQuery } from '@/api/hooks/useGetAllPlansQuery'
import { useGetUserProgressQuery } from '@/api/hooks/useGetUserProgressQuery'
import { useGetUserSubscriptionQuery } from '@/api/hooks/useGetUserSubscriptionQuery'

import Quests, { QuestSkeleton } from '@/components/learn/quests'
import UserProgress, {
	UserProgressSkeleton
} from '@/components/learn/user-progress'
import Items, { ItemsSkeleton } from '@/components/shop/items'
import FeedWrapper from '@/components/wrappers/feed-wrapper'
import StickyWrapper from '@/components/wrappers/sticky-wrapper'

export default function ShopPage() {
	const { data: userProgress, isLoading: isLoadingUserProgress } =
		useGetUserProgressQuery()
	const { data: userSubscription, isLoading: isLoadingUserSubscription } =
		useGetUserSubscriptionQuery()
	const { data: plans, isLoading: isLoadingPlans } = useGetAllPlansQuery()

	const isLoading =
		isLoadingUserProgress || isLoadingUserSubscription || isLoadingPlans

	if (isLoading) return <ShopPageSkeleton />

	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses')
	}

	const isPro = !!userSubscription?.isActive

	return (
		<div className='flex flex-row-reverse gap-12 px-6'>
			<StickyWrapper>
				<UserProgress />
				<Quests />
			</StickyWrapper>
			<FeedWrapper>
				<div className='flex w-full flex-col items-center'>
					<Image src='/shop.svg' alt='Shop' width={90} height={90} />
					<h1 className='my-6 text-center text-2xl font-bold text-neutral-800'>
						Магазин
					</h1>
					<p className='text-muted-foreground mb-6 text-center text-lg'>
						Тратьте свои баллы на интересные вещи.
					</p>
					<Items
						hearts={userProgress?.hearts}
						points={userProgress?.points}
						hasActiveSubscription={isPro}
						plan={plans?.[0]!}
					/>
				</div>
			</FeedWrapper>
		</div>
	)
}

function ShopPageSkeleton() {
	return (
		<div className='flex flex-row-reverse gap-12 px-6'>
			<StickyWrapper>
				<UserProgressSkeleton />
				<QuestSkeleton />
			</StickyWrapper>
			<FeedWrapper>
				<div className='flex w-full flex-col items-center'>
					<Image src='/shop.svg' alt='Shop' width={90} height={90} />
					<h1 className='my-6 text-center text-2xl font-bold text-neutral-800'>
						Магазин
					</h1>
					<p className='text-muted-foreground mb-6 text-center text-lg'>
						Тратьте свои баллы на интересные вещи.
					</p>
					<ItemsSkeleton />
				</div>
			</FeedWrapper>
		</div>
	)
}
