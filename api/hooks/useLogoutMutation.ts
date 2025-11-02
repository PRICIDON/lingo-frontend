import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { logout } from '@/api/requests/auth'

export function useLogoutMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, any>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['logout'],
		mutationFn: logout,
		...options
	})
}
