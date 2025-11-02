import { instance } from '@/api/instance'

export const upsertChallengeProgress = async (data: any) =>
	await instance
		.put('/challenges/upsert-challenge-progress', data)
		.then(res => res.data)
