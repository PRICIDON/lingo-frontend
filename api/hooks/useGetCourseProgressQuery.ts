import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getCourseProgress } from '@/api/requests/courses'
import { GetCourseProgressResponse } from '@/api/types'

export function useGetCourseProgressQuery(
	options?: Omit<
		UseQueryOptions<GetCourseProgressResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get course progress'],
		queryFn: getCourseProgress,
		...options
	})
}
