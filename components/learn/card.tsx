import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

interface CardProps {
	id: string
	title: string
	imageSrc: string
	onClick: (id: string) => void
	disabled?: boolean
	active?: boolean
}

export default function Card({
	id,
	title,
	imageSrc,
	onClick,
	disabled,
	active
}: CardProps) {
	return (
		<div
			className={cn(
				'flex h-full min-h-[217px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2',
				disabled && 'pointer-events-none opacity-50'
			)}
			onClick={() => onClick(id)}
		>
			<div className='flex min-h-[24px] w-full items-center justify-end'>
				{active && (
					<div className='flex items-center justify-center rounded-md bg-green-600 p-1.5'>
						<CheckIcon className='size-4 stroke-[4] text-white' />
					</div>
				)}
			</div>
			<Image
				src={imageSrc}
				alt={title}
				height={70}
				width={93.33}
				className='rounded-lg border object-cover drop-shadow-md'
			/>
			<p className='mt-3 text-center font-bold text-neutral-700'>
				{title}
			</p>
		</div>
	)
}

export function CardSkeleton() {
	return (
		<div className='flex h-full min-h-[217px] min-w-[200px] animate-pulse flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6'>
			<div />
			{/* Заглушка под картинку */}
			<div className='relative my-3 flex items-center justify-center'>
				<div className='h-[70px] w-[93.33px] rounded-lg bg-neutral-200' />
			</div>

			{/* Заглушка под текст */}
			<div className='h-4 w-24 rounded bg-neutral-200' />
		</div>
	)
}
