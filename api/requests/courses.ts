import { api, instance } from '@/api/instance'
import {
	GetCourseProgressResponse,
	GetCourseResponse,
	UpsertUserProgressRequest
} from '@/api/types'

export const getCourses = async () =>
	await api.get<GetCourseResponse[]>('/courses').then(res => res.data)

export const getCourseProgress = async () =>
	await instance
		.get<GetCourseProgressResponse>('/courses/progress')
		.then(res => res.data)

export const upsertUserProgress = async (data: UpsertUserProgressRequest) =>
	await instance
		.put('/courses/upsert-user-progress', data)
		.then(res => res.data)
