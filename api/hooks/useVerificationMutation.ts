import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { newVerification } from '@/api/requests/auth'

export function useVerificationMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, string | null>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['verification email'],
		mutationFn: (token: string | null) => newVerification(token),
		...options
	})
}
