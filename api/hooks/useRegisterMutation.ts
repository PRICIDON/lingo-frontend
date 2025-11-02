import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { register } from '@/api/requests/auth'
import type { AuthResponse, RegisterRequest } from '@/api/types'

export function useRegisterMutation(
	options?: Omit<
		UseMutationOptions<
			AuthResponse,
			unknown,
			{ data: RegisterRequest; recaptcha: string }
		>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['register'],
		mutationFn: ({
			data,
			recaptcha
		}: {
			data: RegisterRequest
			recaptcha: string
		}) => register(data, recaptcha),
		...options
	})
}
