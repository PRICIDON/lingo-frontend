import React from 'react'

import { ListSkeleton } from '@/components/learn/list'

export default function Loading() {
	return (
		<div className='mx-auto h-full max-w-[912px] px-3'>
			<h1 className='text-2xl font-bold text-neutral-700'>
				Языковые курсы
			</h1>
			<ListSkeleton />
		</div>
	)
}
