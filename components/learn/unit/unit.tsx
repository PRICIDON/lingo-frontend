import React from 'react'

import type { GetLessonResponse } from '@/api/types'

import LessonButton, {
	LessonButtonSkeleton
} from '@/components/learn/unit/lesson-button'
import UnitBanner, {
	UnitBannerSkeleton
} from '@/components/learn/unit/unit-banner'

interface UnitProps {
	title: string
	description: string
	lessons: GetLessonResponse[]
	activeLesson: GetLessonResponse | undefined
	activeLessonPercentage: number
}

export default function Unit({
	activeLessonPercentage,
	lessons,
	activeLesson,
	description,
	title
}: UnitProps) {
	return (
		<>
			<UnitBanner title={title} description={description} />
			<div className='relative flex flex-col items-center'>
				{lessons.map((lesson, index) => {
					const isCurrent = lesson.id === activeLesson?.id
					const isLocked = !lesson.completed && !isCurrent

					return (
						<LessonButton
							key={lesson.id}
							id={lesson.id}
							index={index}
							totalCount={lessons.length - 1}
							current={isCurrent}
							locked={isLocked}
							percentage={activeLessonPercentage}
						/>
					)
				})}
			</div>
		</>
	)
}

export function UnitSkeleton() {
	return (
		<>
			<UnitBannerSkeleton />
			<div className='relative flex flex-col items-center'>
				{Array.from({ length: 5 }).map((_, i) => (
					<LessonButtonSkeleton key={i} index={i} totalCount={5} />
				))}
			</div>
		</>
	)
}
