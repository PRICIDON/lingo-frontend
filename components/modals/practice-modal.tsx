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
						Practice lesson
					</DialogTitle>
					<DialogDescription className='text-center text-base'>
						Use practice lessons to regain hearts and points. You
						cannot loose hearts or points in practice lessons.
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
							I understand
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
