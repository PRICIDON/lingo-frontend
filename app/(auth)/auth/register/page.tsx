import React from 'react'
import type {Metadata} from 'next'
import RegisterForm from '@/components/auth/register-form'

export const metadata: Metadata = {
	title: "Регистрация"
}

export default function RegisterPage() {
	return (
		<RegisterForm />
	)
}
