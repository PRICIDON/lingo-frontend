import { type ClassValue, clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string): string {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function errorCatch(error: any) {
	const message = error.response.data.message
	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})
}

export function toastMessageHandler(error: any) {
	const errorMessage =
		error?.response?.data?.message ||
		error?.data?.message ||
		error?.message ||
		'Ошибка со стороны сервера'

	const firstDotIndex = errorMessage.indexOf('.')

	if (firstDotIndex !== -1) {
		toast.error(errorMessage.slice(0, firstDotIndex), {
			description: errorMessage.slice(firstDotIndex + 1)
		})
	} else {
		toast.error(errorMessage)
	}
}
