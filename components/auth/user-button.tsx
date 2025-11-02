'use client'

import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useGetMeQuery } from '@/api/hooks/useGetMeQuery'
import { useLogoutMutation } from '@/api/hooks/useLogoutMutation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function UserButton() {
	const router = useRouter()
	const { data: user } = useGetMeQuery()
	const { mutate, isPending } = useLogoutMutation()

	const handleLogout = () => {
		mutate(
			{},
			{
				onSuccess() {
					toast.success('Выход выполнен')
					router.push('/auth/login')
				},
				onError(err) {
					console.error(err)
					toast.error('Что-то пошло не так')
				}
			}
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='relative rounded-full p-0'
				>
					<Avatar className='size-10'>
						<AvatarImage src={user?.imageSrc} alt={user?.name} />
						<AvatarFallback>{user?.name[0]}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' className='w-56'>
				<div className='flex items-center gap-2 p-2'>
					<Avatar className='size-8'>
						<AvatarImage src={user?.imageSrc} alt={user?.name} />
						<AvatarFallback>{user?.name[0]}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col'>
						<span className='font-medium'>{user?.name}</span>
						<span className='text-muted-foreground text-xs'>
							{user?.email}
						</span>
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem onClick={() => router.push('/profile')}>
					<UserIcon className='mr-2 size-4' />
					Профиль
				</DropdownMenuItem>

				<DropdownMenuItem onClick={() => router.push('/settings')}>
					<Settings className='mr-2 size-4' />
					Настройки
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onClick={handleLogout}
					disabled={isPending}
					className='text-rose-500 focus:text-rose-500'
				>
					<LogOut className='mr-2 size-4 text-rose-500' />
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
