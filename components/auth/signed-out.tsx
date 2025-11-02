import React from 'react'

import { useAuth } from '@/hooks/useAuth'

interface SignedOutProps {
	children: React.ReactNode
}

export default async function SignedOut({ children }: SignedOutProps) {
	const { isAuthorized } = await useAuth()

	if (isAuthorized) return null

	return <>{children}</>
}
