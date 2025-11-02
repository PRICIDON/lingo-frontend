import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getUserSubscription } from '@/api/requests/users'
import { UserSubscriptionResponse } from '@/api/types'

export function useGetUserSubscriptionQuery(
	options?: Omit<
		UseQueryOptions<UserSubscriptionResponse, unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get user subscription'],
		queryFn: getUserSubscription,
		...options
	})
}
