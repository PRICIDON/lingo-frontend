import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getLessonPercentage } from '@/api/requests/lessons'

export function useGetLessonPercentageQuery(
	options?: Omit<UseQueryOptions<number, unknown>, 'queryKey' | 'queryFn'>
) {
	return useQuery({
		queryKey: ['get lesson percentage'],
		queryFn: getLessonPercentage,
		...options
	})
}
