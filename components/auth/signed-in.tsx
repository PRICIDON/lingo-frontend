import React from 'react'

import { useAuth } from '@/hooks/useAuth'

interface SignedInProps {
	children: React.ReactNode
}

export default async function SignedIn({ children }: SignedInProps) {
	const { isAuthorized } = await useAuth()

	if (!isAuthorized) return null

	return <>{children}</>
}
