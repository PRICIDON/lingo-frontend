import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { refillHearts } from '@/api/requests/users'

export function useRefillHeartsMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, any>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['refill hearts'],
		mutationFn: refillHearts,
		...options
	})
}
