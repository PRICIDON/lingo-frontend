'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useResetPasswordMutation } from '@/api/hooks/useResetPasswordMutation'

import AuthWrapper from '@/components/auth/auth-wrapper'
import { Button } from '@/components/ui/button'

import { toastMessageHandler } from '@/lib/utils'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

const resetPasswordSchema = z.object({
	email: z.email({ message: 'Введите корректный адрес электронной почты' })
})

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const router = useRouter()
	const { mutate, isPending } = useResetPasswordMutation({
		onSuccess() {
			toast.success('Проверьте почту', {
				description:
					'На вашу почту была отправлена ссылка для подтверждения.'
			})
		},
		onError(error: any) {
			toastMessageHandler(error)
		}
	})

	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const onSubmit = (values: ResetPasswordFormValues) => {
		if (recaptchaValue) {
			mutate({ data: values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			title='Сброс пароля'
			description='Для сброса пароля введите свою почту'
			bottomText='Вспомнили данные?'
			bottomTextLink='Войти в аккаунт'
			bottomLinkHref='/auth/login'
		>
			<Form {...form}>
				<form
					className='space-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input
										placeholder='perega.sirat@govno.ru'
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={
								process.env.GOOGLE_RECAPTCHA_SITE_KEY as string
							}
							onChange={setRecaptchaValue}
						/>
					</div>
					<Button
						variant='secondary'
						type='submit'
						size='lg'
						className='w-full'
						disabled={isPending}
					>
						Сбросить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
