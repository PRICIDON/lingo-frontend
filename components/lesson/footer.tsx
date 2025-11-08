import { CheckCircle, XCircle } from 'lucide-react'
import React from 'react'
import { useKey, useMedia } from 'react-use'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

interface FooterProps {
	disabled?: boolean
	status: 'correct' | 'wrong' | 'none' | 'completed'
	onCheck: () => void
	lessonId?: string
}

export default function Footer({
	disabled,
	status,
	onCheck,
	lessonId
}: FooterProps) {
	useKey('Enter', onCheck, {}, [onCheck])
	const isMobile = useMedia('(max-width: 1024px)')

	return (
		<footer
			className={cn(
				'h-[100px] border-t-2 lg:h-[140px]',
				status === 'correct' && 'border-transparent bg-green-100',
				status === 'wrong' && 'border-transparent bg-rose-100'
			)}
		>
			<div className='mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 lg:px-10'>
				{status === 'correct' && (
					<div className='flex items-center text-base font-bold text-green-500 lg:text-2xl'>
						<CheckCircle className='mr-4 size-6 lg:size-10' />
						Отлично сделано!
					</div>
				)}
				{status === 'wrong' && (
					<div className='flex items-center text-base font-bold text-rose-500 lg:text-2xl'>
						<XCircle className='mr-4 size-6 lg:size-10' />
						Попробуй еще раз.
					</div>
				)}
				{status === 'completed' && (
					<Button
						variant='default'
						size={isMobile ? 'sm' : 'lg'}
						onClick={() =>
							(window.location.href = `/lesson/${lessonId}`)
						}
					>
						Попрактиковаться еще раз.
					</Button>
				)}
				<Button
					disabled={disabled}
					className='ml-auto'
					onClick={onCheck}
					size={isMobile ? 'sm' : 'lg'}
					variant={status === 'wrong' ? 'danger' : 'secondary'}
				>
					{status === 'none' && 'Проверить'}
					{status === 'correct' && 'Продолжить'}
					{status === 'wrong' && 'Еще раз'}
					{status === 'completed' && 'Продолжить'}
				</Button>
			</div>
		</footer>
	)
}
