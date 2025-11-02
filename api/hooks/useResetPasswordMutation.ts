import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { resetPassword } from '@/api/requests/auth'

export function useResetPasswordMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, { data: any; recaptcha: string }>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['reset password'],
		mutationFn: ({ data, recaptcha }: { data: any; recaptcha: string }) =>
			resetPassword(data, recaptcha),
		...options
	})
}
