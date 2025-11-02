import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getLessonById } from '@/api/requests/lessons'
import { GetLessonResponse } from '@/api/types'

export function useGetLessonByIdQuery(
	lessonId: string,
	options?: Omit<
		UseQueryOptions<GetLessonResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get lesson by id'],
		queryFn: () => getLessonById(lessonId),
		enabled: !!lessonId,
		...options
	})
}
