'use client'

import React from 'react'

import { useGetCourseProgressQuery } from '@/api/hooks/useGetCourseProgressQuery'
import { useGetLessonPercentageQuery } from '@/api/hooks/useGetLessonPercentageQuery'
import { useGetUnitsQuery } from '@/api/hooks/useGetUnitsQuery'

import Header from '@/components/learn/header'
import Promo from '@/components/learn/promo'
import Quests from '@/components/learn/quests'
import Unit from '@/components/learn/unit/unit'
import UserProgress from '@/components/learn/user-progress'
import Loading from '@/components/loading'
import FeedWrapper from '@/components/wrappers/feed-wrapper'
import StickyWrapper from '@/components/wrappers/sticky-wrapper'

export default function LearnPage() {
	const { data: units, isLoading: isLoadingUnits } = useGetUnitsQuery()
	const { data: courseProgress, isLoading: isLoadingCourseProgress } =
		useGetCourseProgressQuery()
	const { data: lessonPercentage, isLoading: isLoadingLessonPercentage } =
		useGetLessonPercentageQuery()

	const isLoading =
		isLoadingUnits || isLoadingCourseProgress || isLoadingLessonPercentage

	if (isLoading) return <Loading />

	if (!courseProgress || !units || !lessonPercentage) return null

	return (
		<div className='flex flex-row-reverse gap-[48px] px-6'>
			<StickyWrapper>
				<UserProgress />
				<Promo />
				<Quests />
			</StickyWrapper>
			<FeedWrapper>
				<Header />
				{units.map(unit => (
					<div className='mb-10' key={unit.id}>
						<Unit
							description={unit.description}
							title={unit.title}
							lessons={unit.lessons!}
							activeLesson={courseProgress.activeLesson}
							activeLessonPercentage={lessonPercentage}
						/>
					</div>
				))}
			</FeedWrapper>
		</div>
	)
}
