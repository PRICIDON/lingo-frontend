import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaGoogle, FaYandex } from 'react-icons/fa'

import { oauthByProvider } from '@/api/requests/auth'

import { Button } from '@/components/ui/button'

export default function AuthSocial() {
	const router = useRouter()

	const { mutateAsync } = useMutation({
		mutationKey: ['oauth'],
		mutationFn: async (provider: 'google' | 'yandex') =>
			await oauthByProvider(provider)
	})

	const onClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)
		if (response) {
			router.push(response.data.url)
		}
	}

	return (
		<>
			<div className='my-6 grid grid-cols-2 gap-6'>
				<Button onClick={() => onClick('google')}>
					<FaGoogle className='mr-2 size-4' />
					Google
				</Button>
				<Button onClick={() => onClick('yandex')}>
					<FaYandex className='mr-2 size-4' />
					Яндекс
				</Button>
			</div>
			<div className='relative mb-2'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='text-muted-foreground bg-gray-50 px-2'>
						Или
					</span>
				</div>
			</div>
		</>
	)
}
