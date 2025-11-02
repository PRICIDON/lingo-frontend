'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

interface ExitModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function ExitModal({ isOpen, onClose }: ExitModalProps) {
	const router = useRouter()

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<div className='mb-5 flex w-full items-center justify-center'>
						<Image
							src='/mascot_sad.svg'
							alt='Mascot'
							width={80}
							height={80}
						/>
					</div>
					<DialogTitle className='text-center text-2xl font-bold'>
						Wait, don&apos;t go!
					</DialogTitle>
					<DialogDescription className='text-center text-base'>
						You&apos;re about to leave the lesson. Are you sure?
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
							Keep learning
						</Button>
						<Button
							variant='dangerOutline'
							className='w-full'
							size='lg'
							onClick={() => {
								onClose()
								router.push('/learn')
							}}
						>
							End session
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
