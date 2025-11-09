import { Infinity } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

interface ResultCardProps {
	value: number
	variant: 'points' | 'hearts'
	hasActiveSubscription?: boolean
}

export default function ResultCard({
	value,
	variant,
	hasActiveSubscription
}: ResultCardProps) {
	const imageSrc = variant === 'hearts' ? '/heart.svg' : '/points.svg'

	return (
		<div
			className={cn(
				'w-full rounded-2xl border-2',
				variant === 'hearts'
					? 'border-rose-500 bg-rose-500'
					: 'border-orange-400 bg-orange-400'
			)}
		>
			<div
				className={cn(
					'rounded-xl p-1.5 text-center text-xs font-bold text-white uppercase',
					variant === 'hearts' ? 'bg-rose-500' : 'bg-orange-400'
				)}
			>
				{variant === 'hearts' ? 'Сердец осталось' : 'Заработано XP'}
			</div>
			<div
				className={cn(
					'flex items-center justify-center rounded-2xl bg-white p-6 text-lg font-bold',
					variant === 'hearts' ? 'text-rose-500' : 'text-orange-400'
				)}
			>
				<Image
					src={imageSrc}
					alt={variant}
					width={30}
					height={30}
					className='mr-1.5'
				/>
				{hasActiveSubscription && variant === 'hearts' ? (
					<Infinity className='size-6 shrink-0 stroke-[3]' />
				) : (
					value
				)}
			</div>
		</div>
	)
}
