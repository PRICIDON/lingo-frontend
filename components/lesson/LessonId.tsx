'use client'

import { redirect } from 'next/navigation'
import React from 'react'

import { useGetLessonByIdQuery } from '@/api/hooks/useGetLessonByIdQuery'

import Quiz from '@/components/lesson/quiz'
import Loading from '@/components/loading'

interface Props {
	lessonId: string
}

export default function LessonId({ lessonId }: Props) {
	const { data: lesson, isLoading } = useGetLessonByIdQuery(lessonId)

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
