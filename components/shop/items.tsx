'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

import { useRefillHeartsMutation } from '@/api/hooks/useRefillHeartsMutation'
import { PlanResponse } from '@/api/types'

import PaymentModal from '@/components/modals/payment-modal'
import { Button } from '@/components/ui/button'

import { POINTS_TO_REFILL } from '@/lib/constants'

interface Props {
	hearts: number
	points: number
	hasActiveSubscription: boolean
	plan: PlanResponse
}

export default function Items({
	points,
	hasActiveSubscription,
	hearts,
	plan
}: Props) {
	const { mutate, isPending } = useRefillHeartsMutation()
	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<PlanResponse | null>(null)

	const onRefillHearts = () => {
		if (isPending) return

		mutate(
			{},
			{
				onError(err) {
					console.error(err)
					toast.error('Что-то пошло не так!')
				}
			}
		)
	}

	const onUpgrade = (plan: PlanResponse) => {
		setSelectedPlan(plan)
		setIsModalOpen(true)
	}

	const openSetting = () => {
		router.push('/setting')
	}

	return (
		<>
			<ul className='w-full'>
				<div className='flex w-full items-center gap-x-4 border-t-2 p-4'>
					<Image
						src='/heart.svg'
						alt='Heart'
						width={60}
						height={60}
					/>
					<div className='flex-1'>
						<p className='text-base font-bold text-neutral-700 lg:text-xl'>
							Восстановить сердца
						</p>
					</div>
					<Button
						onClick={onRefillHearts}
						disabled={
							isPending ||
							hearts === 5 ||
							points < POINTS_TO_REFILL
						}
					>
						{hearts === 5 ? (
							'Макс.'
						) : (
							<div className='flex items-center'>
								<Image
									src='/points.svg'
									alt='Points'
									height={20}
									width={20}
								/>
								<p>{POINTS_TO_REFILL}</p>
							</div>
						)}
					</Button>
				</div>
				<div className='flex w-full items-center gap-x-4 border-t-2 p-4 pt-8'>
					<Image
						src='/unlimited.svg'
						alt='Unlimited Heart'
						width={60}
						height={60}
					/>
					<div className='flex-1'>
						<p className='text-base font-bold text-neutral-700 lg:text-xl'>
							Неограниченное количество сердец
						</p>
					</div>
					<Button
						disabled={isPending}
						onClick={
							!hasActiveSubscription
								? () => onUpgrade(plan)
								: openSetting
						}
					>
						{hasActiveSubscription ? 'Настройки' : 'Обновиться'}
					</Button>
				</div>
			</ul>
			{selectedPlan && (
				<PaymentModal
					onClose={() => setIsModalOpen(false)}
					isOpen={isModalOpen}
					plan={selectedPlan!}
				/>
			)}
		</>
	)
}
