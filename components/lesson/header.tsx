import { Infinity, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

import ExitModal from '@/components/modals/exit-modal'
import { Progress } from '@/components/ui/progress'

interface HeaderProps {
	hearts: number
	percentage: number
	hasActiveSubscription: boolean
}

export default function Header({
	hearts,
	hasActiveSubscription,
	percentage
}: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<header className='mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-5 lg:pt-[50px]'>
				<X
					onClick={() => setIsOpen(true)}
					className='cursor-pointer text-slate-500 transition hover:opacity-75'
				/>
				<Progress value={percentage} />
				<div className='flex items-center font-bold text-rose-500'>
					<Image
						src='/heart.svg'
						height={28}
						width={28}
						alt='Heart'
						className='mr-2'
					/>
					{hasActiveSubscription ? (
						<Infinity className='size-6 shrink-0 stroke-[3]' />
					) : (
						hearts
					)}
				</div>
			</header>
			<ExitModal onClose={() => setIsOpen(false)} isOpen={isOpen} />
		</>
	)
}

export function HeaderSkeleton() {
	return (
		<header className='mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-5 lg:pt-[50px]'>
			<X className='cursor-pointer text-slate-500 transition hover:opacity-75' />
			<Progress value={0} />
			<div className='flex items-center font-bold text-rose-500'>
				<Image
					src='/heart.svg'
					height={28}
					width={28}
					alt='Heart'
					className='mr-2'
				/>
				0
			</div>
		</header>
	)
}
