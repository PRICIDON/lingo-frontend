import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { resetPassword } from '@/api/requests/auth'

export function useResetPasswordMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, any>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['reset password'],
		mutationFn: (data: any) => resetPassword(data),
		...options
	})
}
