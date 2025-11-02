import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getLesson } from '@/api/requests/lessons'
import { GetLessonResponse } from '@/api/types'

export function useGetLessonQuery(
	options?: Omit<
		UseQueryOptions<GetLessonResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get lesson'],
		queryFn: getLesson,
		...options
	})
}
