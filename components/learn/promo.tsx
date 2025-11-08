'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useGetUserSubscriptionQuery } from '@/api/hooks/useGetUserSubscriptionQuery'

import { Button } from '@/components/ui/button'

export default function Promo() {
	const { data: userSubscription, isLoading } = useGetUserSubscriptionQuery()

	if (isLoading) return null

	const isPro = !!userSubscription?.isActive

	if (isPro) return null

	return (
		<div className='space-y-4 rounded-xl border-2 p-4'>
			<div className='space-y-2'>
				<div className='flex items-center gap-x-2'>
					<Image
						src='/unlimited.svg'
						alt='Pro'
						height={26}
						width={26}
					/>
					<h3 className='text-lg font-bold'>
						Обновиться до Lingo Plus
					</h3>
				</div>
				<p className='text-muted-foreground'>
					Получить неограниченное количество сердец и многое другое!
				</p>
			</div>
			<Link href='/shop'>
				<Button variant='super' className='w-full' size='lg'>
					Обновиться сейчас
				</Button>
			</Link>
		</div>
	)
}
