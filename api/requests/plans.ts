import { instance } from '@/api/instance'
import { PlanResponse } from '@/api/types'

export const getAllPlans = async () =>
	await instance.get<PlanResponse[]>(`/plans`).then(res => res.data)
