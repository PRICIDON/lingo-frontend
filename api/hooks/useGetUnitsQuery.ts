import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getUnits } from '@/api/requests/units'
import { GetUnitsResponse } from '@/api/types'

export function useGetUnitsQuery(
	options?: Omit<
		UseQueryOptions<GetUnitsResponse[], unknown>,
		'queryKey' | 'queryFn'
	>
) {
	return useQuery({
		queryKey: ['get units'],
		queryFn: getUnits,
		...options
	})
}
