import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getAllPlans } from '@/api/requests/plans'
import { PlanResponse } from '@/api/types'

export function useGetAllPlansQuery(
	options?: Omit<
		UseQueryOptions<PlanResponse[], unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get all plans'],
		queryFn: getAllPlans,
		...options
	})
}
