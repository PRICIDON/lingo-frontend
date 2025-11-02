import { instance } from '@/api/instance'
import { GetLessonResponse } from '@/api/types'

export const getLesson = async () =>
	await instance
		.get<GetLessonResponse>(`/lessons/active`)
		.then(res => res.data)

export const getLessonById = async (lessonId: string) =>
	await instance
		.get<GetLessonResponse>(`/lessons/practice/${lessonId}`)
		.then(res => res.data)

export const getLessonPercentage = async () =>
	await instance.get<number>('/lessons/percentage').then(res => res.data)
