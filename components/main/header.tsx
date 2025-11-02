import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import SignedIn from '@/components/auth/signed-in'
import SignedOut from '@/components/auth/signed-out'
import UserButton from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'

export default function Header() {
	return (
		<header className='h-20 w-full border-b-2 border-slate-200 px-4'>
			<div className='mx-auto flex h-full items-center justify-between lg:max-w-screen-lg'>
				<div className='flex items-center gap-x-3 pt-8 pb-7 pl-4'>
					<Image
						src='/mascot.svg'
						alt='Mascot'
						height={40}
						width={40}
					/>
					<h1 className='text-2xl font-extrabold tracking-wide text-green-600'>
						Lingo
					</h1>
				</div>
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<Link href='/auth/login'>
						<Button variant='ghost' size='lg'>
							Login
						</Button>
					</Link>
				</SignedOut>
			</div>
		</header>
	)
}
