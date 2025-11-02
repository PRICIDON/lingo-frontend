import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { newPassword } from '@/api/requests/auth'

export function useNewPasswordMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, { data: any; recaptcha: string }>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['new password'],
		mutationFn: ({
			data,
			token,
			recaptcha
		}: {
			data: any
			token: string | null
			recaptcha: string
		}) => newPassword(data, token, recaptcha),
		...options
	})
}
