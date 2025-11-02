import { Metadata } from 'next'
import React, { Suspense } from 'react'

import NewVerification from '@/components/auth/new-verification'

export const metadata: Metadata = {
	title: 'Подтверждение почты'
}

export default function NewVerificationPage() {
	return (
		<Suspense>
			<NewVerification />
		</Suspense>
	)
}
