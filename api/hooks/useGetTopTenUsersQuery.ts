import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getTopTenUsers } from '@/api/requests/users'
import { GetUserProgressResponse } from '@/api/types'

export function useGetTopTenUsersQuery(
	options?: Omit<
		UseQueryOptions<GetUserProgressResponse[], unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get top ten users'],
		queryFn: getTopTenUsers,
		...options
	})
}
