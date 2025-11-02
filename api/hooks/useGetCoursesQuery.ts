import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getCourses } from '@/api/requests/courses'
import { GetCourseResponse } from '@/api/types'

export function useGetCoursesQuery(
	options?: Omit<
		UseQueryOptions<GetCourseResponse[], unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get courses'],
		queryFn: getCourses,
		...options
	})
}
