'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetMeQuery } from '@/api/hooks/useGetMeQuery'
import { useUpdateProfileMutation } from '@/api/hooks/useUpdateProfileMutation'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import { toastMessageHandler } from '@/lib/utils'

const settingsSchema = z.object({
	name: z.string().min(1, { message: 'Введите имя' }),
	email: z.email({
		message: 'Введите корректный адрес электронной почты'
	}),
	isTwoFactorEnabled: z.boolean()
})

export type SettingsFormValues = z.infer<typeof settingsSchema>

export default function SettingsForm() {
	const { data: user, isLoading } = useGetMeQuery()
	const { mutate, isPending } = useUpdateProfileMutation({
		onSuccess() {
			toast.success('Профиль успешно обновлен')
		},
		onError(err) {
			toastMessageHandler(err)
		}
	})

	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(settingsSchema),
		values: {
			name: user?.name || '',
			email: user?.email || '',
			isTwoFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	if (isLoading) return <div>Loading...</div>

	const onSubmit = (values: SettingsFormValues) => {
		mutate(values)
	}

	return (
		<>
			<div>
				<h1 className='text-3xl font-bold text-gray-900'>Аккаунт</h1>
			</div>
			<Card>
				<CardContent>
					<Form {...form}>
						<form
							className='grid space-y-4'
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
								name='isTwoFactorEnabled'
								control={form.control}
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>
												Двухфакторная аутентификация
											</FormLabel>
											<FormDescription>
												Включите двухфакторную
												аутентификацию для вашей учетной
												записи
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled={isPending}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className='text-sky-500'
								type='submit'
								disabled={isPending}
							>
								Сохранить
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	)
}
