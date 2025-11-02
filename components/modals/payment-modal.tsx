import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { useInitPaymentMutation } from '@/api/hooks/useInitPaymentMutation'
import {
	InitPaymentRequestBillingPeriod,
	InitPaymentRequestProvider,
	type PlanResponse
} from '@/api/types'

import PaymentMethods from '@/components/shop/payment-methods'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

import { cn } from '@/lib/utils'

import { Label } from '../ui/label'

export const initPaymentSchema = z.object({
	planId: z.string(),
	provider: z.enum(InitPaymentRequestProvider),
	billingPeriod: z.enum(InitPaymentRequestBillingPeriod)
})

export type InitPaymentFormValues = z.infer<typeof initPaymentSchema>

interface PaymentModalProps {
	isOpen: boolean
	onClose: () => void
	plan: PlanResponse
}

export default function PaymentModal({
	isOpen,
	plan,
	onClose
}: PaymentModalProps) {
	const router = useRouter()
	const { mutate, isPending } = useInitPaymentMutation({
		onSuccess(data) {
			router.push(data.url)
		}
	})
	const form = useForm<InitPaymentFormValues>({
		resolver: zodResolver(initPaymentSchema),
		defaultValues: {
			planId: plan.id,
			provider: InitPaymentRequestProvider.YOOKASSA,
			billingPeriod: InitPaymentRequestBillingPeriod.MONTHLY
		}
	})

	const billingPeriod = form.watch('billingPeriod')
	const price =
		billingPeriod === InitPaymentRequestBillingPeriod.YEARLY
			? plan.yearlyPrice
			: plan.monthlyPrice

	const { isValid } = form.formState

	const onSubmit = (values: InitPaymentFormValues) => {
		mutate(values)
	}

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Оплата</DialogTitle>
					<DialogDescription>
						Тариф "{plan.title}" - {price}&#8381; /
						{billingPeriod ===
						InitPaymentRequestBillingPeriod.MONTHLY
							? ' месяц'
							: ' год'}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<PaymentMethods control={form.control} />

						<FormField
							name='billingPeriod'
							control={form.control}
							render={({ field }) => {
								const isYearly =
									field.value ===
									InitPaymentRequestBillingPeriod.YEARLY
								const toggleBillingPeriod = (
									checked: boolean
								) => {
									field.onChange(
										checked
											? InitPaymentRequestBillingPeriod.YEARLY
											: InitPaymentRequestBillingPeriod.MONTHLY
									)
								}

								return (
									<FormItem className='flex flex-col items-start gap-3 px-4 py-6'>
										<Label className='text-md font-bold text-gray-700'>
											Период оплаты:
										</Label>

										<div className='flex items-center gap-2'>
											<span
												className={cn(
													'text-sm font-medium transition-colors',
													isYearly
														? 'text-gray-400'
														: 'text-primary'
												)}
											>
												Месячно
											</span>
											<FormControl>
												<Switch
													checked={isYearly}
													onCheckedChange={
														toggleBillingPeriod
													}
												/>
											</FormControl>
											<span
												className={cn(
													'text-sm font-medium transition-colors',
													isYearly
														? 'text-primary'
														: 'text-gray-400'
												)}
											>
												Годовая
											</span>
										</div>
									</FormItem>
								)
							}}
						/>

						<div className='flex gap-x-3 pt-6'>
							<Button
								type='button'
								variant='dangerOutline'
								size='lg'
								onClick={onClose}
								className='flex-1'
							>
								Отмена
							</Button>
							<Button
								type='submit'
								disabled={!isValid || isPending}
								size='lg'
								variant='primary'
								className='flex-1'
							>
								Продолжить
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
