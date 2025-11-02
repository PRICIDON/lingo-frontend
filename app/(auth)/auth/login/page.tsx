import type { Metadata } from 'next'
import React from 'react'

import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
	title: 'Вход в аккаунт'
}

export default function LoginPage() {
	return <LoginForm />
}
