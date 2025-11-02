import React from 'react'

import DashboardHeader from '@/components/settings/header'
import PaymentHistory from '@/components/settings/payment-history'
import SubscriptionInfo from '@/components/settings/subscription-info'

export default function SettingsPage() {
	return (
		<div className='min-h-screen px-4 py-8'>
			<div className='mx-auto max-w-6xl space-y-8'>
				<DashboardHeader />

				<div className='grid gap-8 lg:grid-cols-3'>
					<div className='lg:col-span-1'>
						<SubscriptionInfo />
					</div>
					<div className='lg:col-span-2'>
						<PaymentHistory />
					</div>
				</div>
			</div>
		</div>
	)
}
