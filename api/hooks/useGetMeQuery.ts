import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getMe } from '@/api/requests/users'
import type { GetMeResponse } from '@/api/types'

export function useGetMeQuery(
	options?: Omit<
		UseQueryOptions<GetMeResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get me'],
		queryFn: getMe,
		...options
	})
}
