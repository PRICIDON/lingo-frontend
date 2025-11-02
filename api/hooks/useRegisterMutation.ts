import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { register } from '@/api/requests/auth'
import type { AuthResponse, RegisterRequest } from '@/api/types'

export function useRegisterMutation(
	options?: Omit<
		UseMutationOptions<AuthResponse, unknown, RegisterRequest>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['register'],
		mutationFn: (data: RegisterRequest) => register(data),
		...options
	})
}
