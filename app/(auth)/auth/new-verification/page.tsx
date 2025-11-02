import { Metadata } from 'next'
import React from 'react'

import NewVerification from '@/components/auth/new-verification'

export const metadata: Metadata = {
	title: 'Подтверждение почты'
}

export default function NewVerificationPage() {
	return <NewVerification />
}
