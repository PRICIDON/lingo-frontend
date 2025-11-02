import { api, instance } from '@/api/instance'
import type { LoginRequest, RegisterRequest } from '@/api/types'

export const register = async (data: RegisterRequest, recaptcha?: string) =>
	await api
		.post('/auth/register', data, {
			headers: recaptcha ? { recaptcha } : undefined,
			withCredentials: true
		})
		.then(res => {
			return res.data
		})

export const login = async (data: LoginRequest, recaptcha?: string) =>
	await api
		.post('/auth/login', data, {
			headers: recaptcha ? { recaptcha } : undefined,
			withCredentials: true
		})
		.then(res => {
			return res.data
		})

export const oauthByProvider = async (provider: 'google' | 'yandex') =>
	await api
		.get<{ url: string }>(`/auth/oauth/connect/${provider}`)
		.then(res => {
			return res.data
		})

export const newVerification = async (token: string | null) =>
	await api.post('/auth/email-confirmation', { token }).then(res => {
		return res.data
	})

export const resetPassword = async (
	data: { email: string },
	recaptcha?: string
) =>
	await api
		.post('/auth/password-recovery/reset', data, {
			headers: recaptcha ? { recaptcha } : undefined
		})
		.then(res => {
			return res.data
		})

export const newPassword = async (
	data: { password: string },
	token: string | null,
	recaptcha?: string
) =>
	await api
		.post(`/auth/password-recovery/new/${token}`, data, {
			headers: recaptcha ? { recaptcha } : undefined
		})
		.then(res => {
			return res.data
		})

export const logout = async () =>
	await instance.post('/auth/logout').then(res => {
		return res.data
	})
