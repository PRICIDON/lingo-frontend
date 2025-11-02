import { type UseMutationOptions, useMutation } from '@tanstack/react-query'

import { toggleAutoRenewal } from '@/api/requests/users'
import {
	UpdateAutoRenewalRequest,
	UpdateAutoRenewalResponse
} from '@/api/types'

export function useToggleAutoRenewalMutation(
	options?: Omit<
		UseMutationOptions<
			UpdateAutoRenewalResponse,
			unknown,
			UpdateAutoRenewalRequest
		>,
		'mutationKey' | 'mutationFn'
	>
) {
	return useMutation({
		mutationKey: ['toggle auto renewal'],
		mutationFn: (data: UpdateAutoRenewalRequest) => toggleAutoRenewal(data),
		...options
	})
}
