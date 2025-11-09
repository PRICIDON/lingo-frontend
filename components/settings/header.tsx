'use client'

import React from 'react'

import { useGetMeQuery } from '@/api/hooks/useGetMeQuery'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function DashboardHeader() {
	const { data, isLoading } = useGetMeQuery()

	return (
		<header className='flex items-center justify-between'>
			<div>
				<h1 className='text-3xl font-bold text-gray-900'>
					Личный кабинет
				</h1>
				<p className='mt-1 text-gray-600'>
					Управляйте своей подпиской и платежами
				</p>
			</div>
			<div className='flex items-center gap-3'>
				<Avatar className='size-10'>
					<AvatarImage src={data?.imageSrc} alt={data?.name} />
					<AvatarFallback>{data?.name[0]}</AvatarFallback>
				</Avatar>
				<div className=''>
					{isLoading ? (
						'Загрузка...'
					) : (
						<>
							<p className='font-medium text-gray-900'>
								{data?.name}
							</p>
							<p className='text-sm text-gray-600'>
								{data?.email}
							</p>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
