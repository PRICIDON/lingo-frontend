import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { upsertChallengeProgress } from '@/api/requests/challenges'

export function useUpsertChallengeProgressMutation(
	options?: Omit<
		UseMutationOptions<any, unknown, any>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['upsert challenge progress'],
		mutationFn: (data: any) => upsertChallengeProgress(data),
		...options
	})
}
