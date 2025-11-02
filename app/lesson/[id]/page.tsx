import React from 'react'

import LessonId from '@/components/lesson/LessonId'

interface Props {
	params: Promise<{
		id: string
	}>
}

export default async function LessonIdPage({ params }: Props) {
	const { id: lessonId } = await params

	return <LessonId lessonId={lessonId} />
}
