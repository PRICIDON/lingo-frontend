import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { upsertUserProgress } from '@/api/requests/courses'

export function useUpsertUserProgressMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, any>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['upsert user progress'],
		mutationFn: (data: any) => upsertUserProgress(data),
		...options
	})
}
