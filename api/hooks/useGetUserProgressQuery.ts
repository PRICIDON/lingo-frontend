import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getUserProgress } from '@/api/requests/users'
import { GetUserProgressResponse } from '@/api/types'

export function useGetUserProgressQuery(
	options?: Omit<
		UseQueryOptions<GetUserProgressResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get user progress'],
		queryFn: getUserProgress,
		...options
	})
}
