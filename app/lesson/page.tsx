'use client'

import { redirect } from 'next/navigation'
import React from 'react'

import { useGetLessonQuery } from '@/api/hooks/useGetLessonQuery'

import Quiz from '@/components/lesson/quiz'
import Loading from '@/components/loading'

export default function LessonPage() {
	const { data: lesson, isLoading } = useGetLessonQuery()

	if (isLoading) return <Loading />

	if (!lesson) redirect('/learn')

	const initialPercentage =
		(lesson?.challenges.filter(challenge => challenge.completed).length /
			lesson?.challenges.length) *
		100

	return (
		<Quiz
			initialLessonId={lesson?.id}
			initialLessonChallenges={lesson?.challenges}
			initialPercentage={initialPercentage}
		/>
	)
}
