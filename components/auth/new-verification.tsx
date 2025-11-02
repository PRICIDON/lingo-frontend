'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

import { useVerificationMutation } from '@/api/hooks/useVerificationMutation'

import AuthWrapper from '@/components/auth/auth-wrapper'
import Loading from '@/components/loading'

export default function NewVerification() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { mutate } = useVerificationMutation({
		onSuccess() {
			toast.success('Почта успешно подтверждена')
			router.push('/settings')
		},
		onError() {
			router.push('/auth/login')
		}
	})

	useEffect(() => {
		mutate(token)
	}, [token])

	return (
		<AuthWrapper title='Подтверждение почты' description=''>
			<div className=''>
				<Loading />
			</div>
		</AuthWrapper>
	)
}
