import axios, { CreateAxiosDefaults } from 'axios'
import { redirect } from 'next/navigation'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const api = axios.create(options)
export const instance = axios.create(options)

instance.interceptors.request.use(config => config)

instance.interceptors.response.use(
	response => response,
	async error => {
		if (error.response.status === 401) redirect('/auth/login')

		throw error
	}
)
