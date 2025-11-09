import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { updateProfile } from '@/api/requests/users'
import { UpdateUserRequest } from '@/api/types'

export function useUpdateProfileMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, UpdateUserRequest>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: UpdateUserRequest) => updateProfile(data),
		...options
	})
}
