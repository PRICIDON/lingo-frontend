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

interface HeartModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function HeartsModal({ isOpen, onClose }: HeartModalProps) {
	const router = useRouter()

	const onClick = () => {
		onClose()
		router.push('/shop')
	}

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<div className='mb-5 flex w-full items-center justify-center'>
						<Image
							src='/mascot_bad.svg'
							alt='Mascot'
							width={80}
							height={80}
						/>
					</div>
					<DialogTitle className='text-center text-2xl font-bold'>
						У вас закончились сердца!
					</DialogTitle>
					<DialogDescription className='text-center text-base'>
						Оформите подписку Lingo Plus и получите неограниченное
						количество сердец или купите их в магазине.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className='mb-4'>
					<div className='flex w-full flex-col gap-y-4'>
						<Button
							variant='primary'
							className='w-full'
							size='lg'
							onClick={onClick}
						>
							Получить неограниченное количество сердец
						</Button>
						<Button
							variant='primaryOutline'
							className='w-full'
							size='lg'
							onClick={onClose}
						>
							Нет, спасибо
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
