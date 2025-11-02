'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRegisterMutation } from '@/api/hooks/useRegisterMutation'

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

const registerSchema = z
	.object({
		name: z.string().min(1, { message: 'Введите имя' }),
		email: z.email({
			message: 'Введите корректный адрес электронной почты'
		}),
		password: z
			.string()
			.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' }),
		passwordRepeat: z.string().min(6, {
			message: 'Пароль подтверждения должен содержать хотя бы 6 символов'
		})
	})
	.refine(data => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat']
	})

export type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
	const router = useRouter()
	const { mutate, isPending } = useRegisterMutation({
		onSuccess(data: any) {
			if (data.message) toastMessageHandler(data)
			router.push('/courses')
		},
		onError(error: any) {
			toastMessageHandler(error)
		}
	})

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const onSubmit = (values: RegisterFormValues) => {
		mutate(values)
	}

	return (
		<AuthWrapper
			title='Регистрация'
			description='Заполните форму нижу, чтобы создать аккаунт'
			bottomText='Уже есть аккаунт?'
			bottomTextLink='Войти'
			bottomLinkHref='/auth/login'
			isShowSocial
		>
			<Form {...form}>
				<form
					className='space-y-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						name='name'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										placeholder='Перега Сиратик'
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
								<FormLabel>Пароль</FormLabel>
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
					<FormField
						name='passwordRepeat'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
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
