'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useLoginMutation } from '@/api/hooks/useLoginMutation'

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

const loginSchema = z.object({
	email: z.email({ message: 'Введите корректный адрес электронной почты' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' }),
	code: z.optional(z.string())
})

export type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)
	const router = useRouter()
	const { mutate, isPending } = useLoginMutation({
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
				setIsShowTwoFactor(true)
			} else {
				toast.success('Успешная авторизация')
				router.push('/learn')
			}
		},
		onError(error: any) {
			toastMessageHandler(error)
		}
	})

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: LoginFormValues) => {
		if (recaptchaValue) {
			mutate({ data: values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			title='Войти'
			description='Введите свои данные для входа в аккаунт'
			bottomText='Еще нет аккаунта?'
			bottomTextLink='Регистрация'
			bottomLinkHref='/auth/register'
			isShowSocial
		>
			<Form {...form}>
				<form
					className='space-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{isShowTwoFactor && (
						<FormField
							name='code'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Код</FormLabel>
									<FormControl>
										<Input
											placeholder='123456'
											disabled={isPending}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!isShowTwoFactor && (
						<>
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
							<FormField
								name='password'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<div className='flex items-center justify-between'>
											<FormLabel>Пароль</FormLabel>
											<Link
												href='/auth/reset-password'
												className='ml-auto inline-block text-sm underline'
											>
												Забыли пароль?
											</Link>
										</div>
										<FormControl>
											<Input
												type='password'
												placeholder='******'
												disabled={isPending}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}
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
						Продолжить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
