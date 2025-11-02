import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { reduceHearts } from '@/api/requests/users'

export function useReduceHeartsMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, any>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['reduce hearts'],
		mutationFn: (data: any) => reduceHearts(data),
		...options
	})
}
