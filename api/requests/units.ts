import { instance } from '@/api/instance'
import { GetUnitsResponse } from '@/api/types'

export const getUnits = async () =>
	await instance
		.get<GetUnitsResponse[]>('/units/in-active-course')
		.then(res => res.data)
