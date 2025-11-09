import { api, instance } from '@/api/instance'
import {
	GetMeResponse,
	GetUserProgressResponse,
	ReduceHeartsRequest,
	UpdateAutoRenewalRequest,
	UpdateAutoRenewalResponse,
	UpdateUserRequest,
	UserSubscriptionResponse
} from '@/api/types'

export const getMe = async () =>
	await instance.get<GetMeResponse>('/users/@me').then(res => res.data)

export const getUserProgress = async () =>
	await instance
		.get<GetUserProgressResponse>('/users/progress')
		.then(res => res.data)

export const getUserSubscription = async () =>
	await instance
		.get<UserSubscriptionResponse>('/users/subscription')
		.then(res => res.data)

export const reduceHearts = async (data: ReduceHeartsRequest) =>
	await instance.post('/users/reduce-hearts', data).then(res => res.data)

export const refillHearts = async () =>
	await instance.post('/users/refill-hearts').then(res => res.data)

export const getTopTenUsers = async () =>
	await api.get<GetUserProgressResponse[]>('/users/top').then(res => res.data)

export const toggleAutoRenewal = async (data: UpdateAutoRenewalRequest) =>
	await instance
		.patch<UpdateAutoRenewalResponse>('/users/@me/auto-renewal', data)
		.then(res => res.data)

export const updateProfile = async (data: UpdateUserRequest) =>
	await instance.patch('/users/@me', data)
