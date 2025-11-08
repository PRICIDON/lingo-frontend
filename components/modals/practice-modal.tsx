'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

interface PracticeModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function PracticeModal({ isOpen, onClose }: PracticeModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<div className='mb-5 flex w-full items-center justify-center'>
						<Image
							src='/heart.svg'
							alt='Heart'
							width={100}
							height={100}
						/>
					</div>
					<DialogTitle className='text-center text-2xl font-bold'>
						Практический урок
					</DialogTitle>
					<DialogDescription className='text-center text-base'>
						Используйте практические уроки, чтобы повторить
						пройденный материал. Вы не можете потерять сердца на
						практических уроках
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='mb-4'>
					<div className='flex w-full flex-col gap-y-4'>
						<Button
							variant='primary'
							className='w-full'
							size='lg'
							onClick={onClose}
						>
							Я понял
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
