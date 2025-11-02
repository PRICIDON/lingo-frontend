import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { newPassword } from '@/api/requests/auth'

export function useNewPasswordMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, { data: any }>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['new password'],
		mutationFn: ({ data, token }: { data: any; token: string | null }) =>
			newPassword(data, token),
		...options
	})
}
