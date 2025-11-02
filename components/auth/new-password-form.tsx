'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useNewPasswordMutation } from '@/api/hooks/useNewPasswordMutation'

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

const newPasswordSchema = z.object({
	password: z
		.string()
		.min(6, { message: 'Пароль должен содержать хотя бы 6 символов' })
})

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>

export default function NewPasswordForm() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const { mutate, isPending } = useNewPasswordMutation({
		onSuccess() {
			toast.success('Пароль успешно изменён', {
				description: 'Теперь вы можете войти в свой аккаунт.'
			})
			router.push('/auth/login')
		},
		onError(error: any) {
			toastMessageHandler(error)
		}
	})

	const form = useForm<NewPasswordFormValues>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: ''
		}
	})

	const onSubmit = (values: NewPasswordFormValues) => {
		mutate({ data: values, token })
	}

	return (
		<AuthWrapper
			title='Новый пароль'
			description='Придумайте новый пароль для вашего аккаунта'
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
