import { Metadata } from 'next'
import React from 'react'

import ResetPasswordForm from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
	title: 'Сброс пароля'
}

export default function ResetPasswordPage() {
	return <ResetPasswordForm />
}
