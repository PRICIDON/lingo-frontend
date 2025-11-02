import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { login } from '@/api/requests/auth'
import type { AuthResponse, LoginRequest } from '@/api/types'

export function useLoginMutation(
	options?: Omit<
		UseMutationOptions<AuthResponse, unknown, LoginRequest>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['login'],
		mutationFn: (data: LoginRequest) => login(data),
		...options
	})
}
