import { Metadata } from 'next'
import React from 'react'

import NewPasswordForm from '@/components/auth/new-password-form'

export const metadata: Metadata = {
	title: 'Новый пароль'
}

export default function ResetPasswordPage() {
	return <NewPasswordForm />
}
