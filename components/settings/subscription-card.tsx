import { type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { cn } from '@/lib/utils'

interface SubscriptionCardProps {
	Icon?: LucideIcon
	iconBg?: string
	iconColor?: string
	title?: string
	description?: ReactNode
	children?: ReactNode
	action?: ReactNode
}

export default function SubscriptionCard({
	Icon,
	iconBg,
	iconColor,
	title,
	description,
	action,
	children
}: SubscriptionCardProps) {
	return (
		<Card className='gap-0 border-0'>
			<CardHeader>
				<CardTitle className='text-lg'>Подписка</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='text-center'>
					{Icon && (
						<div
							className={cn(
								'mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gray-100',
								iconBg
							)}
						>
							<Icon className={cn('size-8', iconColor)} />
						</div>
					)}
					{title && (
						<h3 className='mb-2 text-lg font-semibold text-gray-900'>
							{title}
						</h3>
					)}
					{description && (
						<p className='mb-6 text-sm text-gray-600'>
							{description}
						</p>
					)}
				</div>
				{children}
				{action}
			</CardContent>
		</Card>
	)
}
